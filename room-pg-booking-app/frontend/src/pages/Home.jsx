import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="hero">
      <section className="hero-content">
        <p className="eyebrow">Room & PG Booking Platform</p>
        <h1>Find safe, clean and affordable rooms near you.</h1>
        <p>
          Search Rooms, PGs and Hostels. Users can book a visit, and admin can manage rooms and booking requests.
        </p>
        <div className="hero-actions">
          <Link to="/rooms" className="btn">Explore Rooms</Link>
          <Link to="/register" className="btn secondary">Create Account</Link>
        </div>
      </section>
      <section className="hero-box">
        <h2>Project Features</h2>
        <ul>
          <li>User Register/Login</li>
          <li>Room Search & Filter</li>
          <li>Booking Request</li>
          <li>Admin Add/Edit/Delete Room</li>
          <li>Admin Approve/Reject Booking</li>
        </ul>
      </section>
    </main>
  );
};

export default Home;
