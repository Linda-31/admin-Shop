import React from "react";

function Order (){
    const orders = [
  {
    id: "ORD001",
    customer: "John Doe",
    date: "2025-06-20",
    amount: 250.75,
    status: "Pending",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    date: "2025-06-21",
    amount: 100.5,
    status: "Shipped",
  },
  {
    id: "ORD003",
    customer: "Alice Johnson",
    date: "2025-06-22",
    amount: 320.0,
    status: "Delivered",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Pending":
      return "warning";
    case "Shipped":
      return "info";
    case "Delivered":
      return "success";
    case "Cancelled":
      return "danger";
    default:
      return "secondary";
  }
};

    return (
        <div className="container mt-4">
      <h2 className="mb-4">Orders Management</h2>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total ($)</th>
              <th>Status</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(({ id, customer, date, amount, status }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{customer}</td>
                <td>{date}</td>
                <td>{amount.toFixed(2)}</td>
                <td>
                  <span className={`badge bg-${getStatusBadge(status)}`}>
                    {status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2">
                    View
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    Cancel
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

export default Order;



