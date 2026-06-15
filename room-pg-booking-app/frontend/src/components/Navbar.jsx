import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">StayNest</Link>
      <nav className="nav-links">
        <NavLink to="/rooms">Rooms</NavLink>
        {user && <NavLink to="/my-bookings">My Bookings</NavLink>}
        {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}
        {!user ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register" className="btn small">Register</NavLink>
          </>
        ) : (
          <button onClick={logout} className="btn small danger">Logout</button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
