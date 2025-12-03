import React, { useEffect, useState } from "react";
import { getProducts, getSuppliers, getOrders } from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    suppliers: 0,
    orders: 0,
    pending: 0,
  });

  useEffect(() => {
    async function load() {
      try {
        const products = await getProducts();
        const suppliers = await getSuppliers();
        const orders = await getOrders();

        setStats({
          products: products?.length || 0,
          suppliers: suppliers?.length || 0,
          orders: orders?.length || 0,
          pending:
            orders?.filter(
              (o) => (o.status || "").toLowerCase() === "pending"
            ).length || 0,
        });
      } catch (e) {
        console.error(e);
      }
    }

    load();
  }, []);

  return (
    <div className="dashboard-grid-wrap">
      <h2 className="page-title">Overview</h2>
      <div className="cards-row">
        <div className="stat-card">
          <div className="card-title">Total Products</div>
          <div className="card-value">{stats.products}</div>
        </div>

        <div className="stat-card">
          <div className="card-title">Total Suppliers</div>
          <div className="card-value">{stats.suppliers}</div>
        </div>

        <div className="stat-card">
          <div className="card-title">Total Orders</div>
          <div className="card-value">{stats.orders}</div>
        </div>

        <div className="stat-card">
          <div className="card-title">Pending Orders</div>
          <div className="card-value">{stats.pending}</div>
        </div>
      </div>
    </div>
  );
}
