package messageService;

import java.util.ArrayList;
import java.util.List;

public class MessageDatabase {

	private static List<Message> messages = new ArrayList<Message>();
	
	public static Message[] getMessagesForUser(String email){
	
		return (Message[])messages.stream().filter(x -> x.getRecipientEmail().equals(email)).toArray();	
	}
	
	public static void addMessage(Message m) {
		messages.add(m);
	}
}
