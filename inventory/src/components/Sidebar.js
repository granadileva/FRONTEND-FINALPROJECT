import React, { useState } from "react";

export default function Sidebar({ active, onNavigate }) {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "products", label: "Product List" },
    { id: "suppliers", label: "Suppliers" },
    { id: "orders", label: "Orders" }
  ];

  return (
    <>
      {/* Mobile Open Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded shadow-lg"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {/* BACKDROP for Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full
          bg-gray-800 text-white p-5 flex flex-col
          w-64 md:w-60 z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🛒</span>
            <span className="text-xl font-bold leading-tight">
              INVENTORY <br /> MANAGEMENT
            </span>
          </div>

          {/* Close button only in mobile */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(false)}
          >
            ✖
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-2 text-base font-medium">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`
                w-full text-left py-2 px-3 rounded transition
                ${active === item.id ? "bg-gray-700" : "hover:bg-gray-700"}
              `}
              onClick={() => {
                onNavigate(item.id);
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

