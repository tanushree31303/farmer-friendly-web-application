package farmify.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import farmify.model.MenusManager;

@RestController
@RequestMapping("/menus")
@CrossOrigin(origins="*")
public class MenusController 
{
	@Autowired
	MenusManager MM;
	@PostMapping("/getmenus")
   public String getMenus()
   {
	   return MM.getMenus();
   }
   
	@PostMapping("/getmenusbyrole")
	public String getMenusbyRole(@RequestBody Map<String, String> data) // map session name and session value 
	{
		return MM.getMenusByRole(data.get("csrid"));
	}
}