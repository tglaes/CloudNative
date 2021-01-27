package gateway;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.http.HttpClient;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Main {

	private static HttpClient client;
	private static HttpServer server;
	
	public static void main(String[] args) throws IOException {
		
		client = HttpClient.newHttpClient();
		server = HttpServer.create(new InetSocketAddress(8300), 0);
		server.createContext("/gateway", new GatewayHandler());
		server.setExecutor(null);
		server.start();
	}

}

class GatewayHandler implements HttpHandler{

	@Override
	public void handle(HttpExchange arg0) throws IOException {
		
		// /gateway/registration
		// /gateway/login
		// /gateway/logout
		// /gateway/sendMessage
		// /gateway/getMessages
		
		System.out.println(arg0.getHttpContext().getPath());
		System.out.println(arg0.getRequestURI());
	}
}