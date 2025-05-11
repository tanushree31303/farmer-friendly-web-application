package farmify.model;

public class OrderResponse {
    private boolean success;

    public OrderResponse() {}

    public OrderResponse(boolean success) {
        this.success = success;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
