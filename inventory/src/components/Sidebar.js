import React, { useState } from "react";

export default function Sidebar({ active, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "products", label: "Product List", icon: "📦" },
    { id: "suppliers", label: "Suppliers", icon: "👥" },
    { id: "orders", label: "Orders", icon: "🧾" },
  ];

  return (
    <aside
      className={`
        bg-gray-900 text-gray-200 h-screen
        transition-all duration-300
        flex flex-col border-r border-gray-700
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">🛒</span>

          {!collapsed && (
            <span className="text-xl font-bold tracking-wide">
              Inventory Management
            </span>
          )}
        </div>

        {/* COLLAPSE/EXPAND BUTTON */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-300 hover:text-white transition"
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col mt-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`
              flex items-center 
              ${collapsed ? "justify-center" : "justify-start space-x-3"}
              py-3 px-4 mx-2 rounded-lg font-medium
              transition-colors duration-200
              ${
                active === item.id
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-800"
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}
