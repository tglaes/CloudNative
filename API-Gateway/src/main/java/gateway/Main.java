package gateway;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.time.Duration;
import java.util.concurrent.CompletableFuture;

import com.google.gson.Gson;
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
	 *   /gateway/registration
	 *   /gateway/login
	 *   /gateway/logout
 	 *	 /gateway/sendMessage
	 *   /gateway/getMessages
	 * 
	 */

	private static HttpClient client = HttpClient.newHttpClient();;
	private static String registrationServiceURL = "http://localhost:8200/registration";
	private static String loginSericeURL = "http://localhost:8000/login/";
	
	@Override
	public void handle(HttpExchange request) throws IOException {

		System.out.println(request.getRequestURI().toString());
		
		switch (request.getRequestURI().toString()) {
		case "/gateway/registration": {

			HttpResponse<String> response = Util.sendHttpPost(client, registrationServiceURL, new String(request.getRequestBody().readAllBytes()));
			Util.writeResponse(request, response.body(), response.statusCode());
			
			break;
		}
		case "/gateway/login": {
			HttpResponse<String> response = Util.sendHttpPost(client, loginSericeURL + "checkLogin", new String(request.getRequestBody().readAllBytes()));
			Util.writeResponse(request, response.body(), response.statusCode());			
		}
		case "/gateway/logout": {

		}
		case "/gateway/sendMessage": {

		}
		case "/gateway/getMessages": {

		}
		default:
			String response = "Error: unknown path";
			request.sendResponseHeaders(404, response.length());
			OutputStream os = request.getResponseBody();
			os.write(response.getBytes());
			os.close();
		}

		// System.out.println(arg0.getHttpContext().getPath());
		// System.out.println(arg0.getRequestURI());
	}
}