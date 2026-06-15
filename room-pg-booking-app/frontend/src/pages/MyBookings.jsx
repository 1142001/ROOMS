import { useEffect, useState } from "react";
import API from "../api/axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/my").then((res) => setBookings(res.data));
  }, []);

  return (
    <main className="container">
      <h1>My Bookings</h1>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Room</th><th>Location</th><th>Visit Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.room?.title}</td>
                <td>{booking.room?.location}</td>
                <td>{new Date(booking.visitDate).toLocaleDateString()}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default MyBookings;
