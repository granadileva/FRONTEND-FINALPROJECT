import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api";
import ConfirmModal from "./ConfirmModal";

function ProductList({ onEdit, onAdd }) {
  const [products, setProducts] = useState([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  function askDelete(id) {
    setDeleteId(id);
    setShowConfirm(true);
  }

  async function confirmDelete() {
    try {
      await deleteProduct(deleteId);
      loadProducts();
      setShowConfirm(false);
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  }

  return (
    <div className="table-container">

      <div className="top-row">
        <h2>Product List</h2>
  
        <button className="add-btn" onClick={onAdd}>+ Add Product</button>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Stock</th>
            <th>Price</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No products found
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.sku}</td>
                <td>{p.stock}</td>
                <td>₱{p.price}</td>

                <td>
                  <button className="action-btn btn-edit" onClick={() => onEdit(p._id)}>
                    Edit
                  </button>
                  &nbsp;
                  <button className="action-btn btn-delete" onClick={() => askDelete(p._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* --- Confirmation Modal --- */}
      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to delete this product?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default ProductList;
