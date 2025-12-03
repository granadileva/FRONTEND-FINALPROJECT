import { useState } from "react";
import { createSupplier } from "../api";

function AddSupplier({ onDone }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
  });

  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    if (!form.name.trim()) return alert("Name is required");
    if (!form.contact.trim()) return alert("Contact is required")
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      await createSupplier({
        name: form.name,
        contact: form.contact,
        email: form.email,
      });

      alert("Supplier created successfully!");
      if (onDone) onDone();
    } catch (err) {
      console.error(err);
      alert("Failed to create supplier — check console.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="app-container">
      <h2>Add Supplier</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input name="name" className="input" placeholder="Supplier Name" value={form.name} onChange={handleChange} />
        <input name="contact" className="input" placeholder="Contact Number" value={form.contact} onChange={handleChange} />
        <input name="email" className="input" placeholder="Email Address (optional)" value={form.email} onChange={handleChange} />

        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Create Supplier"}
        </button>
      </form>
    </div>
  );
}

export default AddSupplier;
