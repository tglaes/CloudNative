package messageService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MessageDatabase {

	private static List<Message> messages = new ArrayList<Message>();
	
	public static Message[] getMessagesForUser(String email){
		
		List<Message> resultMessages = new ArrayList<Message>();
		messages.forEach(x -> {
			
			if(x.getRecipientEmail().equals(email)) {
				resultMessages.add(x);
			}
			
		});
		
		return resultMessages.toArray(new Message[resultMessages.size()]);
	}
	
	public static void addMessage(Message m) {
		m.setMessageTime(new Date());
		messages.add(m);
	}
}
