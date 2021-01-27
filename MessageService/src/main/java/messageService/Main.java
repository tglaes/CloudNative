package messageService;

import java.io.IOException;
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
		server = HttpServer.create(new InetSocketAddress(8100), 0);
		server.createContext("/message", new MessageHandler());
		server.setExecutor(null);
		server.start();
		
		Gson g = new Gson();
		SendMessage sm = new SendMessage();
		sm.setBody("Hallo wie gehts?");
		sm.setRecipientEmail("test@test.de");
		sm.setToken("jawd34md9023q4dnq247q24d23");
		System.out.println(g.toJson(sm));
		
		Message m1 = new Message();
		m1.setBody("Hello Cloud Native");
		m1.setRecipientEmail("hallo@test.de");
		m1.setSenderEmail("sender@sending.com");
		
		Message m2 = new Message();
		m2.setBody("Test test test");
		m2.setRecipientEmail("hallo@test.de");
		m2.setSenderEmail("sender2@sending.com");
		
		Message m3 = new Message();
		m3.setBody("1 2 3 four five six");
		m3.setRecipientEmail("hallo@test.de");
		m3.setSenderEmail("sender3@sending.com");
		
		Message[] messages = new Message[3];
		messages[0] = m1;
		messages[1] = m2;
		messages[2] = m3;
		System.out.println(g.toJson(messages));	
	}

}

class MessageHandler implements HttpHandler{

	@Override
	public void handle(HttpExchange arg0) throws IOException {
		// TODO Auto-generated method stub
		
	}
}
