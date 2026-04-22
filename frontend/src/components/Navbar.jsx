import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <div className="navbar">
      <div className="logo">StayEase</div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {token && <Link to="/admin">Admin</Link>}
      </div>
    </div>
  );
}