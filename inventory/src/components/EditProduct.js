// src/components/EditProduct.js
import { useEffect, useState } from "react";
import { getProduct, updateProduct } from "../api";

function EditProduct({ id, onDone }) {
  const [form, setForm] = useState({ name: "", sku: "", quantity: "", price: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function load() {
      setLoading(true);
      try {
        const p = await getProduct(id);
        setForm({
          name: p.name || "",
          sku: p.sku || "",
          quantity: p.quantity ?? "",
          price: p.price ?? "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    if (!form.name.trim()) { alert("Name required"); return false; }
    if (form.quantity === "" || isNaN(Number(form.quantity)) || Number(form.quantity) < 0) { alert("Quantity invalid"); return false; }
    if (form.price === "" || isNaN(Number(form.price)) || Number(form.price) < 0) { alert("Price invalid"); return false; }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await updateProduct(id, {
        name: form.name,
        sku: form.sku,
        quantity: Number(form.quantity),
        price: Number(form.price),
      });
      alert("Product updated");
      onDone();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading product...</p>;
  return (
    <div>
      <h2>Edit Product</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" className="input" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="sku" className="input" placeholder="Sku" value={form.sku} onChange={handleChange} />
        <input name="quantity" className="input" placeholder="Quantity" value={form.quantity} onChange={handleChange} type="number" />
        <input name="price" className="input" placeholder="Price" value={form.price} onChange={handleChange} type="number" step="0.01" />
        <div style={{marginTop:10}}>
          <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? "Saving..." : "Update Product"}</button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
