import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  const loadBookings = () => API.get("/bookings/admin").then((res) => setBookings(res.data));

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (id, status) => {
    await API.patch("/bookings/" + id + "/status", { status });
    loadBookings();
  };

  return (
    <div>
      <h1>Manage Bookings</h1>
      <div className="table-wrap">
        <table>
          <thead><tr><th>User</th><th>Room</th><th>Visit Date</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.user?.name}</td>
                <td>{booking.room?.title}</td>
                <td>{new Date(booking.visitDate).toLocaleDateString()}</td>
                <td>{booking.status}</td>
                <td>
                  <button className="btn mini" onClick={() => updateStatus(booking._id, "Approved")}>Approve</button>
                  <button className="btn mini danger" onClick={() => updateStatus(booking._id, "Rejected")}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
