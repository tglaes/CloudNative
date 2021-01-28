package loginService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

public class LoginDatabase {

	private static HashMap<String, Login> tokenMap = new HashMap<String, Login>();
	private static List<Login> loginData = new ArrayList<Login>();
	
	public static void createNewLogin(Login l) {		
		loginData.add(l);	
	}
	
	public static String createNewSessionToken(Login l) {
		
		boolean isLoginCorrect = loginData.stream().anyMatch(x -> (x.getEmail().equals(l.getEmail()) && (x.getPassword().equals(l.getPassword()))));
		
		if(isLoginCorrect) {
			
			UUID uuid = UUID.randomUUID();
			tokenMap.put(uuid.toString(), l);
			return uuid.toString();
			
		} else {
			return "Login not correct!";
		}
	}
	
	public static String destroySessionToken(String token) {
		
		if(tokenMap.containsKey(token)) {
			tokenMap.remove(token);
			return "Success";
		} else {
			return "Session could not be deleted";
		}	 
	}
	
	public static String checkToken(String token) {
		if(tokenMap.containsKey(token)) {
			return tokenMap.get(token).getEmail();
		} else {
			return "Token invalid";
		}
	}
}
