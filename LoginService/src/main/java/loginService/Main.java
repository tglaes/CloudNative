package loginService;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Main {

	private static HttpServer server;

	public static void main(String[] args) throws IOException {

		server = HttpServer.create(new InetSocketAddress(8000), 0);
		server.createContext("/login", new LoginHandler());
		server.setExecutor(null);
		server.start();
	}
}

class LoginHandler implements HttpHandler {

	@Override
	public void handle(HttpExchange t) throws IOException {

		String body = new String(t.getRequestBody().readAllBytes());
		
		switch (t.getRequestURI().toString()) {
		case "/login/createnNewLogin": {

			Login l = new Gson().fromJson(body, Login.class);
			LoginDatabase.createNewLogin(l);

			writeResponse(t, "ok", 200);

			break;
		}
		case "/login/checkLogin": {
			
			Login l = new Gson().fromJson(body, Login.class);

			if (l == null) {
				returnError(t, "No Login data provided");
			} else {
				String token = LoginDatabase.createNewSessionToken(l);
				if (token != null) {
					writeResponse(t, token, 200);
				} else {
					writeResponse(t, "Password or username not correct", 200);
				}
			}
			break;
		}
		case "/login/logout": {

			String token = body;

			if(token == null || token.isEmpty()) {
				writeResponse(t, "Token cannot be null or empty", 200);
			} else {
				String result = LoginDatabase.destroySessionToken(token);
				writeResponse(t, result, 200);
			}		
			break;
		}
		case "/login/checkToken": {

			String token = body;

			if(token == null || token.isEmpty()) {
				writeResponse(t, "Token cannot be null or empty", 200);
			} else {
				String result = LoginDatabase.checkToken(token);
				writeResponse(t, result, 200);
			}		
			break;
		}
		default:
			returnError(t, "Unknown path " + t.getRequestURI().toString());
		}
	}

	public static void writeResponse(HttpExchange request, String body, int statusCode) throws IOException {
		request.sendResponseHeaders(statusCode, body.length());
		OutputStream os = request.getResponseBody();
		os.write(body.getBytes());
		os.close();
	}

	public void returnError(HttpExchange message, String error) throws IOException {
		message.sendResponseHeaders(404, error.length());
		OutputStream os = message.getResponseBody();
		os.write(error.getBytes());
		os.close();
	}
}