import React, { useState } from "react";

export default function Sidebar({ active, onNavigate }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Open Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full
          w-64 bg-gray-800 text-white p-5
          transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-60
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🛒</span>
            <span className="text-xl font-bold leading-tight">
              INVENTORY<br />MANAGEMENT
            </span>
          </div>

          <button className="md:hidden text-2xl" onClick={() => setOpen(false)}>
            ✖
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {["dashboard", "products", "suppliers", "orders"].map((item) => (
            <button
              key={item}
              className={`
                py-2 px-3 rounded text-left
                ${active === item ? "bg-gray-700" : "hover:bg-gray-700"}
              `}
              onClick={() => {
                onNavigate(item);
                setOpen(false);
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
