package messageService;

public class SendMessage {

	private String body;
	private String recipientEmail;
	private String token;
	
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public String getRecipientEmail() {
		return recipientEmail;
	}
	public void setRecipientEmail(String recipientEmail) {
		this.recipientEmail = recipientEmail;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
}