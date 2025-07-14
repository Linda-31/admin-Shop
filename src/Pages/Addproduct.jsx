import React from "react";
import '../Styles/style.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

const AddProduct = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        productName: "",
        brandName: "",
        category: "",
        price: "",
        color: "",
        size: "",
        description: "",
        image: "",
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:4000/api/products/add", formData);
            alert("✅ Product added successfully!");
            setFormData({
                productName: "",
                brandName: "",
                category: "",
                price: "",
                color: "",
                size: "",
                description: "",
                image: "",
            });
            setImagePreview(null);
            console.log(response.data);
        } catch (error) {
            console.error("Error adding product:", error);
            alert("❌ Failed to add product.");
        }
    };


    return (
        <div className="container mt-5">
            <h5>📦 Add Product</h5>
            <form className="product-form" onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label className="form-label label-styled">Product Name</label>
                    <input type="text" className="form-control" placeholder="Enter product name" />
                </div>
                <div className="mb-3">
                    <label className="form-label label-styled">Price</label>
                    <input type="number" className="form-control" placeholder="Enter price" />
                </div>
                <div className="mb-3">
                    <label className="form-label label-styled">Product Image</label>
                    <input type="file" className="form-control" onChange={handleImageChange} />
                </div>

                {imagePreview && (
                    <div className="image-preview-box" >
                        <img
                            src={imagePreview}
                            alt="Product Preview"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label label-styled">Category</label>
                    <select className="form-select">
                        <option value="">Select category</option>
                        <option value="electronics">Electronics</option>
                        <option value="apparel">Apparel</option>
                        <option value="books">Books</option>
                        <option value="home">Home & Garden</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>

                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label label-styled">Color</label>
                    <input type="text" className="form-control" placeholder="Enter color" />
                </div>

                <div className="mb-3">
                    <label className="form-label label-styled">Size</label>
                    <input type="text" className="form-control" placeholder="Enter size" />
                </div>

                <div className="mb-3">
                    <label className="form-label label-styled">Description</label>
                    <textarea className="form-control" rows={4} placeholder="Enter product description"></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label label-styled">Brand Name</label>
                    <input type="text" className="form-control" placeholder="Enter brand name" />
                </div>
                <button type="submit" className="btn btn-success">Save Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
