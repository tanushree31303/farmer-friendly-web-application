package farmify.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import farmify.model.JWTManager;
import farmify.model.Products;
import farmify.model.ProductsManager;
import farmify.repository.ProductsRepository;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductsController 
{
	@Autowired
	ProductsManager JM;
	
	@Autowired
	ProductsRepository PR;
	
	@Autowired
	JWTManager jwt; 

	@PostMapping("/insert")
	public String insert(@RequestBody Map<String, Object> payload) {
	    ObjectMapper mapper = new ObjectMapper();
	    Products product = mapper.convertValue(payload.get("product"), Products.class);
	    String csrid = (String) payload.get("csrid");
	    return JM.insertProducts(product, csrid);
	}

	@GetMapping("/readproduct")
	public String readproducts()
	{
		return JM.readProducts();
	}
	@GetMapping("/getproduct/{id}")
	public String getproductbyid(@PathVariable("id") Long id)
	{
		return JM.getProductDetailsbyId(id);
		
	}
	@PutMapping("/update")
	public String updateproduct(@RequestBody Products J)
	{
		return JM.updateProduct(J);
	}
	@DeleteMapping("/delete/{id}")
	public String deleteproduct(@PathVariable("id") Long id)
	{
		return JM.deleteProduct(id);
	}
	
	@GetMapping("/getall")
	public List<Products> getAllProducts() {
	    return JM.getAllProducts();
	}
	
	@GetMapping("/myproducts")
	public List<Products> getMyProducts(@RequestHeader("Authorization") String token) {
	    return JM.getProductsByFarmer(token);
	}
	
	
	@GetMapping("/products/by-email/{csrid}")
	public ResponseEntity<List<Products>> getProductsByFarmer(@PathVariable("csrid") String csrid) {
	    String email = jwt.validateToken(csrid);  
	    if (email.equals("401")) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());
	    }
	    List<Products> products = PR.findByFarmerEmail(email);
	    return ResponseEntity.ok(products);
	}





}
