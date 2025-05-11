import React, { useState, useEffect } from "react";
import { getSession } from "./api";
import "./Sell.css";

const Sell = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    pname: "",
    description: "",
    price: "",
    pimage: "",
  });

  // Fetch products on mount
  useEffect(() => {
    const csrid = getSession("csrid");
    if (!csrid) {
      setError("User not logged in.");
      return;
    }

    fetch(`http://localhost:8089/products/products/by-email/${csrid}`, {
      headers: { "Authorization": `Bearer ${csrid}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message));
  }, []);

  // Input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // Add or update product
  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    const csrid = getSession("csrid");
    if (!csrid) {
      alert("User not logged in.");
      return;
    }

    const isEdit = Boolean(editingProduct);
    // Build product object
    const productPayload = isEdit
      ? editingProduct
      : { ...newProduct, farmerEmail: csrid }; // camelCase here

    // For insert, wrap as { product: ..., csrid: ... }
    const bodyPayload = isEdit
      ? productPayload
      : { product: productPayload, csrid };

    const url = isEdit
      ? "http://localhost:8089/products/update"
      : "http://localhost:8089/products/insert";

    fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${csrid}`,
      },
      body: JSON.stringify(bodyPayload),
    })
      .then((res) =>
        res.text().then((text) => {
          if (!res.ok) throw new Error(`${res.status} ${text}`);
          return text;
        })
      )
      .then((msg) => {
        const [code, text] = msg.split("::");
        if (code === "200") {
          alert(text);
          if (isEdit) {
            setProducts((prev) =>
              prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
            );
            setEditingProduct(null);
          } else {
            setProducts((prev) => [...prev, productPayload]);
            setNewProduct({
              pname: "",
              description: "",
              price: "",
              pimage: "",
            });
          }
        } else {
          alert("Error: " + text);
        }
      })
      .catch((err) => alert("Error saving product: " + err.message));
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:8089/products/delete/${id}`, { method: "DELETE" })
      .then(() => setProducts((prev) => prev.filter((p) => p.id !== id)))
      .catch((err) => alert("Error deleting product: " + err));
  };

  return (
    <div className="sell-container">
      <h2>Your Products</h2>
      {error && <p className="error">{error}</p>}

      <div className="content">
        {/* Product List */}
        <div className="product-list-wrapper">
        <div className="product-list">
          {products.length > 0 ? (
            products.map((prod) => (
              <div key={prod.id} className="product-card">
                <img
                  src={`./${prod.pimage}`}
                  alt={prod.pname}
                  className="product-image"
                />
                <h3>{prod.pname}</h3>
                <p>{prod.description}</p>
                <p>Price: ₹{prod.price}</p>
                <p>Rating: {prod.rating}</p>
                <p>Farmer: {prod.farmerEmail}</p>
                <button onClick={() => setEditingProduct(prod)}>Edit</button>
                <button onClick={() => handleDeleteProduct(prod.id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            !error && <p>No products available.</p>
          )}
        </div>
        </div>

        {/* Add/Edit Form */}
        <div className="product-form">
          <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>
          <form onSubmit={handleAddOrUpdateProduct}>
            <input
              type="text"
              name="pname"
              placeholder="Product Name"
              value={editingProduct ? editingProduct.pname : newProduct.pname}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={
                editingProduct
                  ? editingProduct.description
                  : newProduct.description
              }
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={editingProduct ? editingProduct.price : newProduct.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="pimage"
              placeholder="Image filename"
              value={editingProduct ? editingProduct.pimage : newProduct.pimage}
              onChange={handleInputChange}
              required
            />
            <div className="form-buttons">
              <button type="submit">
                {editingProduct ? "Update" : "Add"}
              </button>
              {editingProduct && (
                <button type="button" onClick={() => setEditingProduct(null)}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sell;
