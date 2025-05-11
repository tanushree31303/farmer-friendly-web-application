package farmify.controller;

import farmify.model.CartItem;
import farmify.model.CartProductDTO;
import farmify.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/add")
    public String addToCart(@RequestParam String buyerEmail,
                            @RequestParam Long productId,
                            @RequestParam(defaultValue = "1") int quantity) {
        CartItem item = new CartItem(buyerEmail, productId, quantity);
        cartRepository.save(item);
        return "Product added to cart!";
    }

    @GetMapping("/view")
    public List<CartItem> viewCart(@RequestParam String buyerEmail) {
        return cartRepository.findByBuyerEmail(buyerEmail);
    }
    
    @GetMapping("/detailed")
    public List<CartProductDTO> getDetailedCart(@RequestParam String buyerEmail) {
        return cartRepository.fetchCartWithProductDetails(buyerEmail);
    }
    
    @GetMapping("/viewdetails")
    public List<CartProductDTO> viewCartWithDetails(@RequestParam String email) {
        return cartRepository.fetchCartWithProductDetails(email);
    }
    @DeleteMapping("/delete/{cartItemId}")
    public String deleteFromCart(@PathVariable Long cartItemId) {
        CartItem item = cartRepository.findById(cartItemId).orElse(null);
        if (item == null) {
            return "Cart item not found!";
        }
       
        cartRepository.delete(item);
        return "Product removed from cart!";
    }




}
