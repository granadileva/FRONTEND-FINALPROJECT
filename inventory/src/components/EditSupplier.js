import { useState } from "react";
import { updateSupplier } from "../api";

export default function EditSupplier({ supplier, onDone }) {
  const [name, setName] = useState(supplier.name);
  const [contact, setContact] = useState(supplier.contact);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateSupplier(supplier._id, { name, contact });
      alert("Supplier updated successfully");
      onDone();
    } catch (err) {
      console.error(err);
      alert("Failed to update supplier");
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">

        <h3>Edit Supplier</h3>

        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Contact:</label>
          <input
            className="form-control"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />

          <button className="btn btn-primary mt-3" type="submit">Save</button>
          <button
            className="btn btn-secondary mt-3 ms-2"
            onClick={onDone}
          >
            Cancel
          </button>
        </form>

      </div>
    </div>
  );
}
