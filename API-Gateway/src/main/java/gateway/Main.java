package gateway;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Main {

	private static HttpServer server;

	public static void main(String[] args) throws IOException {

		server = HttpServer.create(new InetSocketAddress(8300), 0);
		server.createContext("/gateway", new GatewayHandler());
		server.setExecutor(null);
		server.start();
	}
}

class GatewayHandler implements HttpHandler {

	/*
	 * 
	 * /gateway/registration /gateway/login /gateway/logout /gateway/sendMessage
	 * /gateway/getMessages
	 * 
	 */

	private static HttpClient client = HttpClient.newHttpClient();;
	private static String registrationServiceURL = "http://localhost:8200/registration";
	private static String loginSericeURL = "http://localhost:8000/login/";
	private static String messageService0URL = "http://localhost:8100/message/";
	// private static String messageService1URL = "http://localhost:8101/message";

	@Override
	public void handle(HttpExchange request) throws IOException {

		System.out.println("URL:" + request.getRequestURI().toString());
		String body = new String(request.getRequestBody().readAllBytes());
		System.out.println("Body: " + body);

		switch (request.getRequestURI().toString()) {
		case "/gateway/registration": {

			HttpResponse<String> response = Util.sendHttpPost(client, registrationServiceURL, body);
			Util.writeResponse(request, response.body(), response.statusCode());
			break;
		}
		case "/gateway/login": {
			HttpResponse<String> response = Util.sendHttpPost(client, loginSericeURL + "checkLogin", body);
			Util.writeResponse(request, response.body(), response.statusCode());
			break;
		}
		case "/gateway/logout": {
			HttpResponse<String> response = Util.sendHttpPost(client, loginSericeURL + "logout", body);
			Util.writeResponse(request, response.body(), response.statusCode());
			break;
		}
		case "/gateway/sendMessage": {
			HttpResponse<String> response = Util.sendHttpPost(client, messageService0URL + "sendMessage", body);
			Util.writeResponse(request, response.body(), response.statusCode());
			break;
		}
		case "/gateway/getMessages": {
			HttpResponse<String> response = Util.sendHttpPost(client, messageService0URL + "getMessages", body);
			Util.writeResponse(request, response.body(), response.statusCode());
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
}