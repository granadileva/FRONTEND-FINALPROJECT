import React, { useEffect, useState } from "react";
import { createProduct, getProduct, updateProduct, getSuppliers } from "../api";

export default function AddProductModal({ open, onClose, editId, onSaved }) {
  const emptyForm = {
    name: "",
    sku: "",
    price: "",
    stock: "",
    supplierId: "",
    description: ""
  };

  const [form, setForm] = useState(emptyForm);
  const [suppliers, setSuppliers] = useState([]);
  const [saving, setSaving] = useState(false);

  // Auto-generate SKU
  function generateSKU(name = "") {
    const prefix = name.trim().slice(0, 3).toUpperCase() || "SKU";
    const random = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}-${random}`;
  }

  useEffect(() => {
    if (!open) return;

    // Load suppliers
    getSuppliers().then(setSuppliers).catch(() => {});

    if (editId) {
      // Editing a product
      getProduct(editId)
        .then((p) => {
          setForm({
            name: p.name ?? "",
            sku: p.sku ?? "",
            price: p.price ?? "",
            stock: p.stock ?? "",
            supplierId: p.supplierId?._id ?? "",
            description: p.description ?? ""
          });
        })
        .catch(() => {});
    } else {
    
      setForm({
        ...emptyForm,
        sku: generateSKU()
      });
    }
  }, [open, editId]);

  async function submit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        name: form.name,
        sku: form.sku,
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 0,
        supplierId: form.supplierId || null,
        description: form.description
      };

      if (editId) {
        await updateProduct(editId, payload);
      } else {
        await createProduct(payload);
      }

      onSaved && onSaved();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-head">
          <h3>{editId ? "Edit Product" : "Add Product"}</h3>
          <button className="close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={submit}>
          <label>
            Name
            <input
              value={form.name}
              onChange={(e) => {
                const name = e.target.value;
                setForm((prev) => ({
                  ...prev,
                  name,
                 
                  sku: !editId ? generateSKU(name) : prev.sku
                }));
              }}
              required
            />
          </label>

          <label>
            SKU
            <input
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
            />
          </label>

          <div className="row">
            <label>
              Price
              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
            </label>

            <label>
              Stock
              <input
                type="number"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
              />
            </label>
          </div>

          <label>
            Supplier
            <select
              value={form.supplierId}
              onChange={(e) =>
                setForm({ ...form, supplierId: e.target.value })
              }
            >
              <option value="">— none —</option>
              {suppliers.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Description
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
