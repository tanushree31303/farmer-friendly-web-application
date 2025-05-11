package farmify.repository;

import farmify.model.CartItem;
import farmify.model.CartProductDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<CartItem, Long> {

    // Existing method
    List<CartItem> findByBuyerEmail(String buyerEmail);

    // New method to join CartItem and Products to return detailed cart info
    @Query("SELECT new farmify.model.CartProductDTO(c.id, p.id, p.pname, p.pimage, p.price, p.rating, p.description, p.farmerEmail, c.quantity) " +
           "FROM CartItem c JOIN Products p ON c.productId = p.id " +
           "WHERE c.buyerEmail = :email")
    List<CartProductDTO> fetchCartWithProductDetails(@Param("email") String email);
    
    
}
