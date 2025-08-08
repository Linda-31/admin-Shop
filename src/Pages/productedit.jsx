import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, Toaster } from 'sonner';

function ProductEdit() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    originalPrice: "",
    color: "",
    sizes: [],
    image: "",
    brandName: "",
    category: "",
    description: "",
    stock: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/products/${id}`);
        const data = res.data;
        setFormData({
          ...data,
          sizes: data.sizes.join(", ")
        });
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...formData,
      sizes: formData.sizes.split(",").map(size => size.trim())
    };

    try {
      await axios.put(`http://localhost:4000/api/products/${id}`, updatedProduct);
      toast.success("Product updated successfully");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update product");
    }
  };

  if (loading) return <div className="container mt-4">Loading...</div>;

  return (
    <div
      className="container"
      style={{
        paddingLeft: '180px',
        paddingTop: '70px',
        fontSize: '17px',
        fontFamily: '"Poppins", sans-serif',
        fontWeight: '500',
     }}
    >
      <Toaster richColors position="top-right" />
      <h4 style={{ marginBottom: '20px' }}>Product Edit</h4>

      <form onSubmit={handleSubmit}>
        <div
          className="row"
          style={{
            backgroundColor: '#fafafa',
            padding: '25px',
            borderRadius: '2px',
            boxShadow: '0 0 8px rgba(0,0,0,0.05)',
            display: 'flex',
            gap: '30px',
            width: '100%',
            flexWrap: 'wrap',
          }}
        >

          <div className="col-md-5">


            <div className="mb-4">
              <label className="form-label">Product Image</label>
              <img
                src={formData.image}
                alt={formData.title}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  backgroundColor: '#eee',
                  marginBottom: '10px',
                }}
              />
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  required
                  style={{
                    width: '100%',
                    height: '200px',
                    fontSize: '14px',
                    backgroundColor: '#f5f5f5',
                    resize: 'vertical',
                  }}
                />
              </div>

            </div>
          </div>


          <div className="col-md-6">
            {[
              { label: 'Product Name', name: 'title' },
              { label: 'Price', name: 'price', type: 'number' },
              { label: 'Original Price', name: 'originalPrice', type: 'number' },
              { label: 'Color', name: 'color' },
              { label: 'Sizes', name: 'sizes' },
              { label: 'Brand Name', name: 'brandName' },
              { label: 'Category', name: 'category' },
              { label: 'Stock', name: 'stock', type: 'number' },
            ].map(({ label, name, type = 'text' }) => (
              <div className="mb-3" key={name}>
                <label className="form-label">{label}</label>
                <input
                  type={type}
                  className="form-control"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  style={{
                    height: '50px',
                    fontSize: '14px',
                    backgroundColor: '#f5f5f5',
                  }}
                />
              </div>
            ))}

            <button type="submit" className="btn btn-success mt-2">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>

  );
}

export default ProductEdit;
