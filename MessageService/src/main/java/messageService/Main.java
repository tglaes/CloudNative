package messageService;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse.BodyHandlers;
import java.time.Duration;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Main {

	private static HttpServer server;

	/**
	 * 
	 * @param args You need to provide a port offset 0 or 1 and the path to the messageDatabase.json file
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException {
		int portOffset = Integer.parseInt(args[0]);
		
		String databasePath = args[1];
		MessageDatabase.databasePath = databasePath;
		
		// Set parameters and start the server
		server = HttpServer.create(new InetSocketAddress(8100 + portOffset), 0);
		server.createContext("/message", new MessageHandler());
		server.setExecutor(null);
		server.start();
	}
}

class MessageHandler implements HttpHandler {

	private static HttpClient client = HttpClient.newHttpClient();
	private static String loginSericeURL = "http://localhost:8000/login/";

	@Override
	public void handle(HttpExchange request) throws IOException {

		String body = new String(request.getRequestBody().readAllBytes());

		// Debug log
		System.out.println("URI=" + request.getRequestURI().toString());
		System.out.println("BODY=" + body);

		switch (request.getRequestURI().toString()) {
		case "/message/sendMessage": {

			// Parse payload from JSON to Java object
			SendMessage sm = new Gson().fromJson(body, SendMessage.class);

			if (sm == null) {
				writeResponse(request, "Message not valid", 200);
				return;
			}

			// Send a request to the login microservice to authorize the user
			HttpResponse<String> response = sendHttpPost(client, loginSericeURL + "checkToken", sm.getToken());

			if (response.body().equals("Token invalid")) {
				writeResponse(request, response.body(), response.statusCode());
			} else {
				MessageDatabase.addMessage(new Message(sm.getBody(), sm.getRecipientEmail(), response.body()));
				writeResponse(request, "Success", 200);
			}
			break;
		}
		case "/message/getMessages": {

			// Parse payload from JSON to Java object
			GetMessages gm = new Gson().fromJson(body, GetMessages.class);

			if (gm == null) {
				writeResponse(request, "Message not valid", 200);
				return;
			}

			// Send a request to the login microservice to authorize the user
			HttpResponse<String> response = sendHttpPost(client, loginSericeURL + "checkToken", gm.getToken());
			if (response.body().equals("Token invalid")) {
				writeResponse(request, response.body(), response.statusCode());
			} else {

				// Get all messages for the user from the database
				Message[] messages = MessageDatabase.getMessagesForUser(response.body());
				writeResponse(request, new Gson().toJson(messages), 200);
			}
			break;
		}
		default:
			String response = "Error: unknown path";
			request.sendResponseHeaders(404, response.length());
			OutputStream os = request.getResponseBody();
			os.write(response.getBytes());
			os.close();
		}
	}

	public static HttpResponse<String> sendHttpPost(HttpClient client, String url, String body) throws IOException {

		HttpRequest registrationRequest = HttpRequest.newBuilder().uri(URI.create(url)).timeout(Duration.ofMinutes(1))
				.header("Content-Type", "plain/text").POST(BodyPublishers.ofString(body)).build();
		try {
			return client.send(registrationRequest, BodyHandlers.ofString());
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return null;
	}

	public void writeResponse(HttpExchange request, String body, int statusCode) throws IOException {
		request.sendResponseHeaders(statusCode, body.length());
		OutputStream os = request.getResponseBody();
		os.write(body.getBytes());
		os.close();
	}
}