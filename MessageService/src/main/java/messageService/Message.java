package messageService;

public class Message {

	private String body;
	private String recipientEmail;
	private String senderEmail;
	
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
	public String getSenderEmail() {
		return senderEmail;
	}
	public void setSenderEmail(String senderEmail) {
		this.senderEmail = senderEmail;
	}
}