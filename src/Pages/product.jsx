import React, { useEffect, useState } from "react";
import { toast, Toaster } from 'sonner';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: "", price: "", stock: "" });

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const searchProducts = async () => {
        try {
          if (searchQuery.trim() === "") {
            const res = await axios.get("http://localhost:4000/api/products");
            setProducts(res.data);
          } else {
            const res = await axios.get(`http://localhost:4000/api/products/search?q=${searchQuery}`);
            setProducts(res.data);
          }
        } catch (error) {
          console.error("Search failed:", error);
          toast.error("Search request failed");
        }
      };

      searchProducts();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleEditClick = (product) => {
    setEditProductId(product._id);
    setEditFormData({
      title: product.title,
      price: product.price,
      stock: product.stock
    });
  };



  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/products/${id}`, editFormData);
      setProducts((prev) =>
        prev.map((product) =>
          product._id === id ? response.data.product : product
        )
      );
      setEditProductId(null);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };
  const handleView = (id) => {
    navigate(`/products/${id}`);
  };

  const handleCancelEdit = () => {
    setEditProductId(null);
  };

  if (loading) return <div className="container mt-4">Loading products...</div>;

  return (
    <> <Toaster richColors position="top-right" />
      <div className="background">
        <h2 className="mb-4">Products List</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <input
            type="search"
            className="form-control w-50"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddProduct}>
            + Add Product
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Added Date</th>
                <th>Amount</th>
                <th>Stock Count</th>
                <th>Stock Status</th>
                <th style={{ width: "200px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const isEditing = editProductId === product._id;
                return (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "5px" }}
                      />
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          value={editFormData.title}
                          onChange={handleEditChange}
                        />
                      ) : (
                        product.title
                      )}
                    </td>
                    <td>{product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "-"}</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          value={editFormData.price}
                          onChange={handleEditChange}
                        />
                      ) : (
                        `₹${product.price.toFixed(1)}`
                      )}
                    </td>
                    <td>{product.stock}</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          className="form-control"
                          name="stock"
                          value={editFormData.stock}
                          onChange={handleEditChange}
                        />
                      ) : (
                        <div className="progress" style={{ height: '10px', width: '60%' }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${Math.min((product.stock / 500) * 100, 100)}%`,
                              backgroundColor: product.stock > 300 ? 'green' : product.stock > 150 ? 'orange' : 'red'
                            }}
                            aria-valuenow={product.stock}
                            aria-valuemin="0"
                            aria-valuemax="500"
                          />
                        </div>
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <>
                          <button className="btn btn-sm btn-success me-2" onClick={() => handleEditSave(product._id)}>Save</button>
                          <button className="btn btn-sm btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditClick(product)}>Edit</button>
                          <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleView(product._id)}>View</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Product;
