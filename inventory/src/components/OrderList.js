// OrdersList.js
import { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "../api";
import ConfirmModal from "../components/ConfirmModal";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function loadOrders() {
    setErrorMessage("");
    setLoadingOrders(true);
    try {
      const data = await getOrders();
      setOrders(data || []);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setErrorMessage("Failed to load orders. Check backend or network.");
    } finally {
      setLoadingOrders(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  function renderStatus(status) {
    const cls =
      status === "Completed"
        ? "status-badge status-completed"
        : status === "Cancelled"
        ? "status-badge status-cancelled"
        : "status-badge status-pending";

    return <span className={cls}>{status || "Pending"}</span>;
  }

  return (
    <div className="app-container">
      <h2>Orders List</h2>

      {errorMessage && (
        <div style={{ color: "red", marginBottom: 12 }}>{errorMessage}</div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Supplier ID</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Status</th>
            <th style={{ width: "100px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {loadingOrders ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>
                Loading orders...
              </td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((o) => {
              const total =
                o.items?.reduce(
                  (sum, item) => sum + (item.price || 0) * (item.qty || 0),
                  0
                ) || 0;

              return (
                <tr key={o._id}>
                  {/* Order ID */}
                  <td>{o._id}</td>

                  {/* Supplier ID */}
                  <td>
                    {o.supplierId?._id || o.supplierId || "No Supplier Assigned"}
                  </td>

                  {/* Items */}
                  <td>
                    {o.items?.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: "18px" }}>
                        {o.items.map((item, i) => (
                          <li key={i}>{item.productId?.name || "Unknown"}</li>
                        ))}
                      </ul>
                    ) : (
                      "No Items"
                    )}
                  </td>

                  {/* Total */}
                  <td>₱{total.toLocaleString()}</td>

                  {/* Status */}
                  <td>{renderStatus(o.status)}</td>

                  {/* Delete button */}
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setDeleteId(o._id);
                        setShowConfirm(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Delete modal */}
      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to delete this order?"
          onConfirm={async () => {
            try {
              await deleteOrder(deleteId);
              setShowConfirm(false);
              loadOrders();
            } catch (err) {
              console.error("Delete order failed:", err);
              alert("Failed to delete order");
            }
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default OrdersList;
