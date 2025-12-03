import { useEffect, useState } from "react";
import { getSuppliers, deleteSupplier } from "../api";
import AddSupplier from "./AddSupplier";

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [adding, setAdding] = useState(false);

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

      {adding && <AddSupplier onDone={() => { setAdding(false); load(); }} />}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.contact}</td>
              <td>{s.actions}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(s._id)}>
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
