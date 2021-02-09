package gateway;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse.BodyHandlers;
import java.time.Duration;

import com.sun.net.httpserver.HttpExchange;

public class Util {

	private Util() {
		
	}
	
	public static HttpResponse<String> sendHttpPost(HttpClient client, String url, String body) throws IOException {
		
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create(url))
				.timeout(Duration.ofMinutes(1))
				.header("Content-Type", "application/json")
				.POST(BodyPublishers.ofString(body))
				.build();
		try {
			return client.send(request, BodyHandlers.ofString());
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static void writeResponse(HttpExchange request, String body, int statusCode) throws IOException {
		
		body = "{'message':'" + body + "'}";
		
		request.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
		
		request.sendResponseHeaders(statusCode, body.length());
		OutputStream os = request.getResponseBody();
		os.write(body.getBytes());
		os.close();
	}
	
	public static String stringFromInputStream(InputStream is) throws IOException {
		
		int c = 0;
		StringBuilder sb = new StringBuilder();
		
		while(is.read() != -1) {
			sb.append((char) c);
		}
		
		return sb.toString();	
	}
	
}
