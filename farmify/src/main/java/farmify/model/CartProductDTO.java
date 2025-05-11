package farmify.model;

public class CartProductDTO {
    private Long cartItemId;
    private Long productId;
    private String pname;
    private String pimage;
    private String price;
    private String rating;
    private String description;
    private String farmerEmail;
    private int quantity;

    // Constructors
    public CartProductDTO(Long cartItemId, Long productId, String pname, String pimage, String price,
                          String rating, String description, String farmerEmail, int quantity) {
        this.cartItemId = cartItemId;
        this.productId = productId;
        this.pname = pname;
        this.pimage = pimage;
        this.price = price;
        this.rating = rating;
        this.description = description;
        this.farmerEmail = farmerEmail;
        this.quantity = quantity;
    }

	public Long getCartItemId() {
		return cartItemId;
	}

	public void setCartItemId(Long cartItemId) {
		this.cartItemId = cartItemId;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
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

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}


}
