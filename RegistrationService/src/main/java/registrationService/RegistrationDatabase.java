package registrationService;

import java.util.ArrayList;
import java.util.List;

public class RegistrationDatabase {

	public static List<Registration> registeredUsers = new ArrayList<Registration>();
	
	public static void addUser(Registration r) {
		
		registeredUsers.add(r);	
	}
}