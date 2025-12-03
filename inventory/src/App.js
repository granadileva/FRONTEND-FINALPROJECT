import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import AddProductModal from "./components/AddProductModal";
import EditProduct from "./components/EditProduct";

import SupplierList from "./components/SupplierList";
import AddSupplier from "./components/AddSupplier";
import ConfirmModal from "./components/ConfirmModal";
import OrderList from "./components/OrderList";

import "./styles/ui.css";
import "./App.css";
import "./index.css";

function App() {
  const [page, setPage] = useState("dashboard");

  
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  
  const openAddProduct = () => {
    setEditId(null);
    setShowModal(true);
  };

  const openEditProduct = (id) => {
    setEditId(id);
    setShowModal(true);
  };

  return (
    <div className="ui-app">
      {/* --------- SIDEBAR ---------- */}
      <Sidebar active={page} onNavigate={setPage} />

      {/* --------- MAIN CONTENT AREA ---------- */}
      <div className="ui-main">
        <Topbar />

        <div className="ui-content">
          {/* -------- DASHBOARD -------- */}
          {page === "dashboard" && <Dashboard />}

          {/* -------- PRODUCTS -------- */}
          {page === "products" && (
            <ProductList
              onEdit={(id) => {
                setEditId(id);
                setPage("editProduct");
          }}
          onAdd={() => setPage("addProduct")}
       />
     )}

     {page === "addProduct" && (
       <AddProduct onDone={() => setPage("products")} />
     )}

     {page === "editProduct" && (
       <EditProduct id={editId} onDone={() => setPage("products")} />
     )}


          {/* -------- SUPPLIERS -------- */}
          {page === "suppliers" && (
            <SupplierList onAdd={() => setPage("addSupplier")} />
          )}

          {page === "addSupplier" && (
            <AddSupplier onDone={() => setPage("suppliers")} />
          )}

          {/* -------- ORDERS -------- */}
          {page === "orders" && <OrderList />}
        </div>

        {/* -------- PRODUCT MODAL (ADD / EDIT) -------- */}
        <AddProductModal
          open={showModal}
          editId={editId}
          onClose={() => setShowModal(false)}
          onSaved={() => {
            setShowModal(false);
            // You can refresh product list here if needed
          }}
        />
      </div>
    </div>
  );
}

export default App;
