import React, { useState } from "react";

export default function Sidebar({ active, onNavigate }) {

  const [open, setOpen] = useState(false);

  return (
    <aside
      className={`
        bg-gray-800 text-white h-screen p-4 flex flex-col
        transition-all duration-300
        fixed md:static 
        ${open ? "left-0 w-64" : "-left-64 w-64"}
        md:left-0 md:w-60
      `}
    >
      {/* Brand */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🛒</span>
          <span className="text-lg font-bold">Inventory</span>
        </div>

        {/* Hamburger for Mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(false)}
        >
          ✖
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 font-medium">
        <button
          className={`py-2 px-3 rounded ${active === "dashboard" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => {
            onNavigate("dashboard");
            setOpen(false);
          }}
        >
          Dashboard
        </button>

        <button
          className={`py-2 px-3 rounded ${active === "products" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => {
            onNavigate("products");
            setOpen(false);
          }}
        >
          Product List
        </button>

        <button
          className={`py-2 px-3 rounded ${active === "suppliers" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => {
            onNavigate("suppliers");
            setOpen(false);
          }}
        >
          Suppliers
        </button>

        <button
          className={`py-2 px-3 rounded ${active === "orders" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => {
            onNavigate("orders");
            setOpen(false);
          }}
        >
          Orders
        </button>
      </nav>

      {/* MOBILE OPEN BUTTON (Placed outside sidebar area) */}
      <button
        className="md:hidden fixed top-3 left-3 bg-gray-800 text-white p-2 rounded"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

    </aside>
  );
}
