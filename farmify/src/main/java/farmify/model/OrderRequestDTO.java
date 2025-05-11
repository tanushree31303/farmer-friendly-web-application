package farmify.model;

import java.util.List;

public class OrderRequestDTO {
    private List<Long> cartItemIds;
    private String shippingAddress;
    private String phoneNumber;
    private String paymentMode;

    public OrderRequestDTO() {}

    public OrderRequestDTO(List<Long> cartItemIds, String shippingAddress, String phoneNumber, String paymentMode) {
        this.cartItemIds = cartItemIds;
        this.shippingAddress = shippingAddress;
        this.phoneNumber = phoneNumber;
        this.paymentMode = paymentMode;
    }

    public List<Long> getCartItemIds() {
        return cartItemIds;
    }

    public void setCartItemIds(List<Long> cartItemIds) {
        this.cartItemIds = cartItemIds;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }
}
