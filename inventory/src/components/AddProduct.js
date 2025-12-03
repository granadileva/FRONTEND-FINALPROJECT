import { useState, useEffect } from "react";
import { createProduct } from "../api";

function AddProduct({ onDone }) {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    stock: "",
    price: "",
    description: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const randomSKU = "SKU-" + Math.floor(100000 + Math.random() * 900000);
    setForm((prev) => ({ ...prev, sku: randomSKU }));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    if (!form.name.trim()) {
      alert("Product name is required");
      return false;
    }

    if (!form.sku.trim()) {
      alert("SKU is required");
      return false;
    }

    if (form.stock === "" || Number(form.stock) < 0) {
      alert("Invalid stock value");
      return false;
    }

    if (form.price === "" || Number(form.price) < 0) {
      alert("Invalid price");
      return false;
    }

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);

    try {
      await createProduct({
        name: form.name,
        sku: form.sku,
        stock: Number(form.stock),
        price: Number(form.price),
        description: form.description,
      });

      alert("Product created successfully!");
      onDone && onDone();
    } catch (err) {
      console.error(err);
      alert("Create failed — check console/logs.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Product</h3>

        <form onSubmit={handleSubmit} className="modal-form">

          {/* PRODUCT NAME FIRST */}
          <input
            name="name"
            className="input"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
          />

          {/* SKU UNDER PRODUCT NAME */}
          <input
            name="sku"
            className="input"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
          />

          <input
            name="stock"
            className="input"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
          />

          <input
            name="price"
            className="input"
            type="number"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <textarea
            name="description"
            className="input textarea"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
            rows={3}
          ></textarea>

          <div className="modal-actions">
            <button className="confirm-btn" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Create Product"}
            </button>

            <button
              className="cancel-btn"
              type="button"
              onClick={onDone}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;
