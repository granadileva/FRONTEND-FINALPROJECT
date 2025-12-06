import { useEffect, useState } from "react";
import { getSuppliers, deleteSupplier } from "../api";
import AddSupplier from "./AddSupplier";
import EditSupplier from "./EditSupplier"; // ← you will create this component

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null); // ← store supplier being edited

  async function load() {
    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load suppliers");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this supplier?")) return;

    try {
      await deleteSupplier(id);
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to delete supplier");
    }
  }

  return (
    <div className="app-container">
      <h2>Suppliers</h2>

      <button className="btn btn-primary" onClick={() => setAdding(true)}>
        Add Supplier
      </button>

      {/* Add Supplier Form */}
      {adding && (
        <AddSupplier
          onDone={() => {
            setAdding(false);
            load();
          }}
        />
      )}

      {/* Edit Supplier Form */}
      {editing && (
        <EditSupplier
          supplier={editing}
          onDone={() => {
            setEditing(null);
            load();
          }}
        />
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.contact}</td>
              <td>
                {/* EDIT BUTTON */}
                <button
                  className="btn btn-warning"
                  onClick={() => setEditing(s)}
                >
                  Edit
                </button>

                {/* DELETE BUTTON */}
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleDelete(s._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default SupplierList;
