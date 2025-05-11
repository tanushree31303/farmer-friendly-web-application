import React, { Component } from 'react';
import './Buy.css';
import { callApi, getSession } from './api';

class Buy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            error: null,
            email: "",
            searchQuery: "",
            sliderImages: [
                "./farm10.jpeg",
                "./farm11.jpeg",
                "./farm8.jpg"
            ],
            currentSlide: 0
        };
    }

    componentDidMount() {
        this.getEmailAndLoadProducts();
        this.startImageSlider();
    }

    startImageSlider = () => {
        this.sliderInterval = setInterval(() => {
            this.setState((prevState) => ({
                currentSlide: (prevState.currentSlide + 1) % prevState.sliderImages.length
            }));
        }, 3000);
    };

    componentWillUnmount() {
        clearInterval(this.sliderInterval);
    }

    getEmailAndLoadProducts() {
        const token = getSession("csrid");

        if (!token) {
            this.setState({ error: "Please log in first." });
            return;
        }

        callApi("POST", "http://localhost:8089/users/getemail", JSON.stringify({ csrid: token }), (response) => {
            if (response.startsWith("401")) {
                this.setState({ error: "Session expired. Please log in again." });
            } else {
                this.setState({ email: response }, this.loadProducts);
            }
        });
    }

    loadProducts = () => {
        callApi("GET", "http://localhost:8089/products/getall", null, this.handleLoadProductsResponse);
    };

    handleLoadProductsResponse = (response) => {
        try {
            const data = JSON.parse(response);
            this.setState({ products: data, error: null });
        } catch (error) {
            this.setState({ error: "Failed to load products." });
        }
    };

    handleAddToCart = (product) => {
        const { email } = this.state;

        if (!email) {
            alert("Please log in to add items to the cart.");
            return;
        }

        const quantity = 1;
        const cartData = new URLSearchParams({
            buyerEmail: email,
            productId: product.id,
            quantity: quantity,
        });

        callApi("POST", `http://localhost:8089/cart/add?${cartData.toString()}`, null, this.handleAddToCartResponse);
    };

    handleAddToCartResponse = (response) => {
        alert("Added to cart!");
    };

    handleSearchChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    };

    render() {
        const { products, error, searchQuery, sliderImages, currentSlide } = this.state;

        const filteredProducts = products.filter(product =>
            product.pname.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="buy-page">
                <div className="slider">
                    <img src={sliderImages[currentSlide]} alt="Promotional Slide" className="slider-image" />
                </div>

                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={this.handleSearchChange}
                    className="search-bar"
                />

                <h2 className="section-title">Available Products</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="product-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <img src={product.pimage} alt={product.pname} className="product-image" />
                                <h3 className="product-name">{product.pname}</h3>
                                <p className="product-desc">{product.description}</p>
                                <div className="product-info">
                                    <span className="product-price">₹{product.price}</span>
                                    <span className="product-rating">⭐ {product.rating}</span>
                                </div>
                                <button
                                    className="add-to-cart-button"
                                    onClick={() => this.handleAddToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>
        );
    }
}

export default Buy;
