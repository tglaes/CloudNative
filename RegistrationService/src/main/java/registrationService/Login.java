package registrationService;

public class Login {

	private String password;
	private String email;

	public Login(String password, String email) {
		this.password = password;
		this.email = email;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String username) {
		this.email = username;
	}
}