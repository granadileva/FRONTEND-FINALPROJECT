import React, { useState } from "react";

export default function Topbar({ onSearch = () => {} }) {
  const [q, setQ] = useState("");

  return (
    <header className="ui-topbar">
      <div className="search">
        <input
          placeholder="Search products, suppliers..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button onClick={() => onSearch(q)}>🔍</button>
      </div>
    </header>
  );
}
