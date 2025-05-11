package farmify.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import farmify.model.Users;
import farmify.model.UsersManager;
@RestController
@RequestMapping("/users")
@CrossOrigin(origins="*")
public class UsersController 
{
	@Autowired
	UsersManager UM;
	
	@PostMapping("/signup")
	public String signup(@RequestBody Users U)
	{
		return UM.addUsers(U);
		
	}
	
	@GetMapping("/forgetpassword/{email}")
	public String forgetpassword(@PathVariable("email") String emailid)
	{
		return UM.recoverPassword(emailid);
	}
	@PostMapping("/signin")
	public String signin(@RequestBody Users U)
	{
		return UM.validateCredentials(U.getEmail(), U.getPassword());
	}
	@PostMapping("/getfullname")
	public String getFullname(@RequestBody Map<String, String> data)
	{
		return UM.getFullname(data.get("csrid"));
	}
	
	@PostMapping("/getprofile")
	public Users getProfile(@RequestBody Map<String, String> data) {
	    return UM.getProfile(data.get("csrid"));
	}
	
	@PostMapping("/getemail")
	public String getEmail(@RequestBody Map<String, String> data) {
	    return UM.getEmailFromToken(data.get("csrid")); // csrid here means token
	}

	@PostMapping("/updateProfile")
	public String updateProfile(@RequestBody Users updatedUser) {
	    try {
	        // Validate and update the user in the database
	        Users existingUser = UM.getUserByEmail(updatedUser.getEmail());
	        if (existingUser != null) {
	            existingUser.setFullname(updatedUser.getFullname());
	            existingUser.setPhone(updatedUser.getPhone());
	            existingUser.setAddress(updatedUser.getAddress());
	            existingUser.setProfilePicture(updatedUser.getProfilePicture());
	            
	            UM.updateUser(existingUser);  // Call the method to update the user in the database
	            return "User profile updated successfully!";
	        } else {
	            return "User not found!";
	        }
	    } catch (Exception e) {
	        return "Error: " + e.getMessage();
	    }
	}


}
