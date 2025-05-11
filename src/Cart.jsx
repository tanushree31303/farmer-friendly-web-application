import React, { Component } from 'react';
import { callApi, getSession } from './api';
import './Cart.css';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            email: '',
            error: null,
            showCheckoutForm: false,
            shippingAddress: '',
            phoneNumber: '',
            paymentMode: '',
            selectedCartItemId: null,
        };
    }

    componentDidMount() {
        this.getEmailAndLoadCart();
    }

    getEmailAndLoadCart = () => {
        const token = getSession('csrid');
        if (!token) {
            this.setState({ error: 'Please log in first.' });
            return;
        }

        callApi('POST', 'http://localhost:8089/users/getemail', JSON.stringify({ csrid: token }), (response) => {
            if (response.startsWith('401')) {
                this.setState({ error: 'Session expired. Please log in again.' });
            } else {
                this.setState({ email: response }, this.loadCartItems);
            }
        });
    };

    loadCartItems = () => {
        const { email } = this.state;
        callApi('GET', `http://localhost:8089/cart/viewdetails?email=${email}`, null, (response) => {
            try {
                const data = JSON.parse(response);
                this.setState({ cartItems: data, error: null });
            } catch {
                this.setState({ error: 'Failed to load cart items.' });
            }
        });
    };

    handleBuyNow = (cartItemId) => {
        this.setState({
            showCheckoutForm: true,
            selectedCartItemId: cartItemId,
            error: null,
        });
    };

    handleCheckoutSubmit = (event) => {
        event.preventDefault();
        const { shippingAddress, phoneNumber, paymentMode, selectedCartItemId } = this.state;

        if (!shippingAddress || !phoneNumber || !paymentMode) {
            this.setState({ error: 'Please fill all the fields.' });
            return;
        }

        const orderDetails = {
            cartItemIds: [selectedCartItemId],
            shippingAddress,
            phoneNumber,
            paymentMode,
        };

        console.log('Submitting order:', orderDetails);

        callApi('POST', 'http://localhost:8089/api/orders/place', JSON.stringify(orderDetails), (response) => {
            try {
                const parsed = JSON.parse(response);
                if (parsed.success) {
                    alert('Order placed successfully!');
                    this.setState({
                        showCheckoutForm: false,
                        shippingAddress: '',
                        phoneNumber: '',
                        paymentMode: '',
                        selectedCartItemId: null,
                    });
                    this.loadCartItems();
                } else {
                    this.setState({ error: 'Failed to place the order.' });
                }
            } catch {
                this.setState({ error: 'Failed to place the order.' });
            }
        });
    };

    handleDeleteItem = (cartItemId) => {
        console.log('Deleting Cart Item ID:', cartItemId);
        if (!window.confirm('Are you sure you want to remove this item from the cart?')) return;

        callApi('DELETE', `http://localhost:8089/cart/delete/${cartItemId}`, null, (response) => {
            console.log('Delete Response:', response);
            if (response === "Product removed from cart!") {
                alert('Item removed from cart!');
                this.loadCartItems();
            } else {
                alert('Failed to remove item from cart.');
            }
        });
    };

    renderCheckoutForm() {
        const { shippingAddress, phoneNumber, paymentMode, error } = this.state;
        return (
            <div className="checkout-form">
                <h3>Enter Order Details</h3>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={this.handleCheckoutSubmit}>
                    <div>
                        <label>Shipping Address:</label>
                        <input
                            type="text"
                            value={shippingAddress}
                            onChange={(e) => this.setState({ shippingAddress: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Payment Mode:</label>
                        <select
                            value={paymentMode}
                            onChange={(e) => this.setState({ paymentMode: e.target.value })}
                            required
                        >
                            <option value="">Select Payment Mode</option>
                            <option value="COD">Cash on Delivery</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Net Banking">Net Banking</option>
                        </select>
                    </div>
                    <button type="submit">Place Order</button>
                </form>
            </div>
        );
    }

    render() {
        const { cartItems, error, showCheckoutForm } = this.state;

        return (
            <div className="cart-page">
                <h2 className="section-title">Your Cart</h2>
                {error && <p className="error-message">{error}</p>}
                {showCheckoutForm ? (
                    this.renderCheckoutForm()
                ) : (
                    <div className="product-list">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.cartItemId} className="product-card-horizontal">
                                    <div
                                        className="delete-button"
                                        onClick={() => this.handleDeleteItem(item.cartItemId)}
                                    >
                                        ❌
                                    </div>
                                    <img src={item.pimage} alt={item.pname} className="product-image" />
                                    <div className="product-details">
                                        <h3>{item.pname}</h3>
                                        <p>{item.description}</p>
                                        <p>Price: ₹{item.price}</p>
                                        <p>Rating: ⭐{item.rating}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <button
                                            className="buy-now-button"
                                            onClick={() => this.handleBuyNow(item.cartItemId)}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No items in your cart.</p>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default Cart;
