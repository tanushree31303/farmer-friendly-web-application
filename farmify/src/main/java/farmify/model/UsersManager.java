package farmify.model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import farmify.repository.UsersRepository;
@Service
public class UsersManager 
{
	@Autowired
	UsersRepository UR;
	
	@Autowired
	EmailManager EM;
	@Autowired
	JWTManager jwt;
	public String addUsers(Users U)
	{
		if(UR.validateEmail(U.getEmail())>0)
			return "401::Email already exists";
		UR.save(U);
		return "200::User Registered sccessfully";		
	}
	
	public Users getUserByEmail(String email) {
	    return UR.findById(email).orElse(null); // Retrieves the user by email, or returns null if not found
	}

	
	public String recoverPassword(String email)
	{
		Users U=UR.findById(email).get();
		String message=String.format("Dear %s \n\n Your password is: %s",U.getFullname(),U.getPassword());
		return EM.sendEmail(U.getEmail(), "farmify recover password ", message);
	}
	public String validateCredentials(String email, String password)
	{
		if(UR.validatecredentials(email, password)>0)
		{
			String token=jwt.generateToken(email);
			return "200::"+token;
		}
		else
		{
			return "400::invalid credentials";
		}
		
	}
	public String getFullname(String token)
	{
		String email=jwt.validateToken(token);
		if(email.compareTo("401")==0)
		{
			return "401::Token expired";
		}
		else
		{
			Users U=UR.findById(email).get();
			return U.getFullname();
		}
	}
	public Users getProfile(String token) {
	    String email = jwt.validateToken(token);
	    if (email.equals("401")) {
	        return null; // or throw an exception
	    }
	    return UR.findById(email).orElse(null);
	}
	public String getEmailFromToken(String token) {
	    String email = jwt.validateToken(token);
	    if (email.equals("401")) {
	        return "401::Token expired";
	    }
	    return email;
	}

	 public String updateUserProfile(Users user) {
	        try {
	            Users existingUser = UR.findById(user.getEmail()).orElse(null);
	            if (existingUser == null) {
	                return "User not found!";
	            }
	            // Update user details
	            existingUser.setAddress(user.getAddress());
	            existingUser.setPhone(user.getPhone());
	            existingUser.setProfilePicture(user.getProfilePicture());

	            // Save updated user details to the database
	            UR.save(existingUser);

	            return "User profile updated successfully!";
	        } catch (Exception e) {
	            return "Error updating profile: " + e.getMessage();
	        }
	    }
	 public boolean updateUser(Users user) {
		    try {
		        // Logic to update user details in the database
		        UR.save(user); // Assuming you use a repository like Spring Data JPA
		        return true;
		    } catch (Exception e) {
		        return false;
		    }
		}


}
