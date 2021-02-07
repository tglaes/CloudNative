package messageService;

import java.util.Date;

public class Message {

	private String body;
	private String recipientEmail;
	private String senderEmail;
	private Date messageTime;
	
	public Message(String body, String recipientEmail, String senderEmail) {
		this.body = body;
		this.recipientEmail = recipientEmail;
		this.senderEmail = senderEmail;
	}
	
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

	public Date getMessageTime() {
		return messageTime;
	}

	public void setMessageTime(Date messageTime) {
		this.messageTime = messageTime;
	}
}