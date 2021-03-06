package registrationService;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Main {

	private static HttpServer server;

	public static void main(String[] args) throws IOException {

		// Set parameters and start the server
		server = HttpServer.create(new InetSocketAddress(8200), 0);
		server.createContext("/registration", new RegistrationHandler());
		server.setExecutor(null);
		server.start();
	}
}

class RegistrationHandler implements HttpHandler {

	private static String loginServiceURL = "http://localhost:8000/login/createnNewLogin";
	private static HttpClient client = HttpClient.newHttpClient();

	@Override
	public void handle(HttpExchange message) throws IOException {

		if (message.getRequestMethod().equals("POST")) {

			String body = new String(message.getRequestBody().readAllBytes());
			
			// Debug log
			System.out.println("URI=" + message.getRequestURI().toString());
			System.out.println("BODY=" + body);
			
			// Parse message payload from JSON to Java object
			Registration r = new Gson().fromJson(body, Registration.class);

			if (r == null) {
				returnError(message, "Registration message malformed");
			} else {

				RegistrationDatabase.addUser(r);

				Login l = new Login(r.getPassword(), r.getEmail());

				HttpResponse<String> loginresponse = Util.sendHttpPost(client, loginServiceURL, new Gson().toJson(l));

				if (loginresponse.statusCode() == 200) {
					String response = "Success";
					message.sendResponseHeaders(loginresponse.statusCode(), response.length());
					OutputStream os = message.getResponseBody();
					os.write(response.getBytes());
					os.close();

				} else {
					returnError(message, "CreateLoginFailed");
				}
			}

		} else {
			returnError(message, "Registration only accepts post requests");
		}
	}

	public void returnError(HttpExchange message, String error) throws IOException {
		message.sendResponseHeaders(404, error.length());
		OutputStream os = message.getResponseBody();
		os.write(error.getBytes());
		os.close();
	}
}