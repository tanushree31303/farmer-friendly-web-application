package farmify.model;

import farmify.model.CartItem;
import farmify.model.Products;
import farmify.model.Order;
import farmify.model.OrderRequestDTO;
import farmify.repository.CartRepository;
import farmify.repository.OrderRepository;
import farmify.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartItemRepository;

    @Autowired
    private ProductsRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    public void placeOrder(OrderRequestDTO request) {
        List<CartItem> cartItems = cartItemRepository.findAllById(request.getCartItemIds());

        List<Order> orders = cartItems.stream().map(cartItem -> {
            Products product = productRepository.findById(cartItem.getProductId()).orElseThrow();

            return new Order(
                product.getId(),
                product.getPname(),
                cartItem.getQuantity(),
                product.getPrice(),
                cartItem.getBuyerEmail(),
                product.getFarmerEmail(),
                LocalDateTime.now(),
                request.getShippingAddress(),
                request.getPhoneNumber(),
                request.getPaymentMode()
            );
        }).collect(Collectors.toList());

        orderRepository.saveAll(orders);

        cartItemRepository.deleteAll(cartItems); // Optional: clear cart after ordering
    }
}
