package messageService;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;

public class MessageDatabase {

	private static String databaseFileName = "messageDatabase.json";
	
	public static Message[] getMessagesForUser(String email) throws IOException{
		
		InputStream is = MessageDatabase.class.getClassLoader().getResourceAsStream(databaseFileName);
		String databaseContent = new String(is.readAllBytes());
		is.close();
		
		Message[] resultMessages = new Gson().fromJson(databaseContent, Message[].class);

		return (Arrays.stream(resultMessages).filter(x -> x.getRecipientEmail().equals(email))).toArray(size -> new Message[size]);
	}
	
	public static void addMessage(Message m) throws IOException {
		m.setMessageTime(new Date());
		
		InputStream is = MessageDatabase.class.getClassLoader().getResourceAsStream(databaseFileName);
		String databaseContent = new String(is.readAllBytes());
		is.close();
		Message[] resultMessages = new Gson().fromJson(databaseContent, Message[].class);

		List<Message> mess = new ArrayList<Message>(Arrays.asList(resultMessages));
		mess.add(m);
		resultMessages = mess.toArray(new Message[0]);
		
		BufferedWriter writer = new BufferedWriter(new FileWriter("C:\\Users\\Tristan Glaes\\CloudNative\\MessageService\\src\\main\\resources\\messageDatabase.json"));
	    writer.write(new Gson().toJson(resultMessages));    
	    writer.close();		
	}
}
