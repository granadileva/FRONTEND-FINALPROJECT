import React from "react";

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="ui-sidebar">
      <div className="brand">
        <div className="logo">🛒</div>
        <div className="brand-name">Inventory Management</div>
      </div>

      <nav className="side-nav">
        <button className={active==="dashboard" ? "active":""} onClick={() => onNavigate("dashboard")}>Dashboard</button>
        <button className={active==="products" ? "active":""} onClick={() => onNavigate("products")}>Product List</button>
        <button className={active==="suppliers" ? "active":""} onClick={() => onNavigate("suppliers")}>Suppliers</button>
        <button className={active==="orders" ? "active":""} onClick={() => onNavigate("orders")}>Orders</button>
      </nav>
    </aside>
  );
}
