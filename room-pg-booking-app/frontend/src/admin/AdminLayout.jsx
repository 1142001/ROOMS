import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <main className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
      </aside>
      <section className="admin-content"><Outlet /></section>
    </main>
  );
};

export default AdminLayout;
