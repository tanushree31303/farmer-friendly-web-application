package farmify.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;

@Entity
@Table(name="products")
public class Products
{
	  @Id
	  @GeneratedValue(strategy=GenerationType.IDENTITY)
	  @Column(name="id")
      Long id;
	  
	  @Column(name="pname")
	  String pname;
	  
	  @Column(name="pimage")
	  String pimage;
	 
	  @Column(name="price")
	  String price;
	  
	  @Column(name="rating")
	  String rating;
	  
	  @Column(name="description")
	  String description;
	  
	  @Column(name = "farmer_email")
	  private String farmerEmail;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public String getPimage() {
		return pimage;
	}

	public void setPimage(String pimage) {
		this.pimage = pimage;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
	public String getFarmerEmail() {
	    return farmerEmail;
	}

	public void setFarmerEmail(String farmerEmail) {
	    this.farmerEmail = farmerEmail;
	}
      
	
}
