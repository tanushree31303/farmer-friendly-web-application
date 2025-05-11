package farmify.model;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.GsonBuilder;

import farmify.repository.ProductsRepository;
import farmify.repository.UsersRepository;
@Service
public class ProductsManager 
{
	@Autowired
	ProductsRepository PR;
	
	@Autowired
	JWTManager jwt; // 🆕

	public String insertProducts(Products product, String csrid) {
	    try {
	        String email = jwt.validateToken(csrid); // Get email from token
	        if (email.equals("401")) return "401::Invalid token";

	        product.setFarmerEmail(email); // Set automatically
	        PR.save(product);
	        return "200::Product added successfully";
	    } catch (Exception e) {
	        return "401::" + e.getMessage();
	    }
	}

	  
	public List<Products> getProductsByFarmer(String csrid) {
	    String email = jwt.validateToken(csrid);
	    if (email.equals("401")) return new ArrayList<>();
	    return PR.findByFarmerEmail(email);
	}


	  
	public String readProducts()
	{
		try 
		{
			List<Products> productList=PR.findAll();
			return new GsonBuilder().create().toJson(productList);
			
		} 
		catch (Exception e) 
		{
			return "401::"+e.getMessage();
		}
	}
	public String getProductDetailsbyId(Long id) 
	{
		try 
		{
			Products J=PR.findById(id).get();
			return new GsonBuilder().create().toJson(J);
		} 
		catch (Exception e) 
		{
			return "401::"+e.getMessage();
		}
		
	}
	


	public String updateProduct(Products J)
	{
		try 
		{
			PR.save(J);
			return "200::Job details are updated:";
		} 
		catch (Exception e) 
		{
			return "401::"+e.getMessage();
		}
	}
	public String deleteProduct(Long id)
	{
		try 
		{
			PR.deleteById(id);
			return "200::Job details are deleted:";
		} 
		catch (Exception e) 
		{
			return "401::"+e.getMessage();
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	public List<Products> getAllProducts() {
        try {
            return PR.findAll(); // Fetch all products from the database
        } catch (Exception e) {
            // Log the error (you can use a logging framework like SLF4J)
            System.err.println("Error retrieving products: " + e.getMessage());
            throw new RuntimeException("Error retrieving products", e); // 
        }
    }


}
