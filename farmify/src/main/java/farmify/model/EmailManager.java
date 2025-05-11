package farmify.model;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service  //to implement dependency injection automatically by springboot framework like @Autowired
public class EmailManager {
	
	@Autowired
	JavaMailSender JMS;
	public String sendEmail(String tomail,String subject,String message)
	{
		try {
			SimpleMailMessage simplemessage=new SimpleMailMessage();
			simplemessage.setFrom("iamtanushreerathore27@gmail.com");
			simplemessage.setTo(tomail);
			simplemessage.setSubject(subject);
			simplemessage.setText(message);
			JMS.send(simplemessage);
			return "200::password has sent to registered email id ";
		}
		catch(Exception e)
		{
			return "401::"+e.getMessage();
		}
	}

}
