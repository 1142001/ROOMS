import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminDashboard = () => {
  const [rooms, setRooms] = useState(0);
  const [bookings, setBookings] = useState(0);

  useEffect(() => {
    API.get("/rooms").then((res) => setRooms(res.data.length));
    API.get("/bookings/admin").then((res) => setBookings(res.data.length));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card"><h3>Total Rooms</h3><p>{rooms}</p></div>
        <div className="stat-card"><h3>Total Bookings</h3><p>{bookings}</p></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
