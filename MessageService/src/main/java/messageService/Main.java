package messageService;

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
		server = HttpServer.create(new InetSocketAddress(8100), 0);
		server.createContext("/message", new MessageHandler());
		server.setExecutor(null);

	}

}

class MessageHandler implements HttpHandler{

	@Override
	public void handle(HttpExchange arg0) throws IOException {
		// TODO Auto-generated method stub
		
	}
}
