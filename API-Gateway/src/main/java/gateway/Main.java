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

		// Set the server parameters and start it
		server = HttpServer.create(new InetSocketAddress(8300), 0);
		server.createContext("/gateway", new GatewayHandler());
		server.setExecutor(null);
		server.start();
	}
}

class GatewayHandler implements HttpHandler {

	private static HttpClient client = HttpClient.newHttpClient();
	private static String registrationServiceURL = "http://localhost:8200/registration";
	private static String loginSericeURL = "http://localhost:8000/login/";
	private static String messageService0URL = "http://localhost:8100/message/";
	private static String messageService1URL = "http://localhost:8101/message/";

	private static boolean takeMessageService1 = true;
	
	
	/**
	 * Fowards request from the client to the microservices
	 * 
	 * @param request The request from the client
	 */
	@Override
	public void handle(HttpExchange request) throws IOException {

		doSecurityCheck(request);
		
		try {
			String body = new String(request.getRequestBody().readAllBytes());
			
			// Debug log
			System.out.println("URL:" + request.getRequestURI().toString());			
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
				
				String messageService = getMessageServiceUrl();
				
				HttpResponse<String> response = Util.sendHttpPost(client, messageService + "sendMessage", body);
				Util.writeResponse(request, response.body(), response.statusCode());
				break;
			}
			case "/gateway/getMessages": {
				
				String messageService = getMessageServiceUrl();
				
				HttpResponse<String> response = Util.sendHttpPost(client, messageService + "getMessages", body);
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
		} catch (Exception e) {
			System.out.println(e.toString());
		}
	}
	
	// Alternately chooses the URL for the message microservice used for the next request
	synchronized String getMessageServiceUrl() {
		
		if (takeMessageService1) {
			takeMessageService1 = false;
			return messageService0URL;
		} else {
			takeMessageService1 = true;
			return messageService1URL;
		}
	}
	
	private void doSecurityCheck(HttpExchange request) {
		// Do some security check
	}
}