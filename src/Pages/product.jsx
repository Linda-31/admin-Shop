import React from "react";

function Product (){
    
const products = [
  { id: 1, name: "Product A", category: "Category 1", price: 25.99, stock: 100 },
  { id: 2, name: "Product B", category: "Category 2", price: 45.0, stock: 50 },
  { id: 3, name: "Product C", category: "Category 3", price: 12.5, stock: 200 },
];
    return (
       <div className="container mt-4">
      <h2 className="mb-4">Products Management</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <input
            type="search"
            className="form-control"
            placeholder="Search products..."
          />
        </div>
        <button className="btn btn-primary">+ Add Product</button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price ($)</th>
              <th>Stock</th>
              <th style={{ width: "130px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ id, name, category, price, stock }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{category}</td>
                <td>{price.toFixed(2)}</td>
                <td>{stock}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}

export default Product;

