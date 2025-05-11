package farmify.controller;

import farmify.model.OrderRequestDTO;
import farmify.model.OrderResponse;
import farmify.model.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public OrderResponse placeOrder(@RequestBody OrderRequestDTO request) {
        orderService.placeOrder(request);
        return new OrderResponse(true); // return a JSON object
    }
}
