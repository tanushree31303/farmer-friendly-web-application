package farmify.repository;

import farmify.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    //  fetch all orders for a specific buyer
    List<Order> findByBuyerEmail(String buyerEmail);

    // fetch all orders for a specific farmer
    List<Order> findByFarmerEmail(String farmerEmail);
}
