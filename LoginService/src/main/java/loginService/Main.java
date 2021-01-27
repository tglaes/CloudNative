package loginService;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.http.HttpClient;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Main {

	private static HttpClient client;
	private static HttpServer server;
	
	public static void main(String[] args) throws IOException {
		
		client = HttpClient.newHttpClient();
		server = HttpServer.create(new InetSocketAddress(8000), 0);
		server.createContext("/login", new LoginHandler());
		server.setExecutor(null);
		server.start();
		
		Login l = new Login();
		l.setEmail("testmail@htwsaar.de");
		l.setPassword("pass");
		System.out.println(new Gson().toJson(l));
		
	}

}

class LoginHandler implements HttpHandler{

	@Override
	public void handle(HttpExchange t) throws IOException {
		// TODO Auto-generated method stub
		String response = "Error";
		t.sendResponseHeaders(404, response.length());
		OutputStream os = t.getResponseBody();
		os.write(response.getBytes());
		os.close();
	}
}