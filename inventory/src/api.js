// src/api.js
const API_BASE = "https://se2-midterm-project-e0oa.onrender.com/api";

async function api(path, method = "GET", body = null) {
  const options = { method, headers: {} };
  if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("json") ? res.json() : res.text();
}

export function getProducts() { return api("/products", "GET"); }
export function getProduct(id) { return api(`/products/${id}`, "GET"); }
export function createProduct(data) { return api("/products", "POST", data); }
export function updateProduct(id, data) { return api(`/products/${id}`, "PUT", data); }
export function deleteProduct(id) { return api(`/products/${id}`, "DELETE"); }

export function getSuppliers() { return api("/suppliers", "GET"); }
export function getSupplier(id) { return api(`/suppliers/${id}`, "GET"); }
export function createSupplier(data) { return api("/suppliers", "POST", data); }
export function updateSupplier(id, data) { return api(`/suppliers/${id}`, "PUT", data); }
export function deleteSupplier(id) { return api(`/suppliers/${id}`, "DELETE"); }

export function getOrders() { return api("/orders", "GET"); }
export function getOrder(id) { return api(`/orders/${id}`, "GET"); }
export function createOrder(data) { return api("/orders", "POST", data); }
export function updateOrder(id, data) { return api(`/orders/${id}`, "PUT", data); }
export function deleteOrder(id) { return api(`/orders/${id}`, "DELETE"); }

