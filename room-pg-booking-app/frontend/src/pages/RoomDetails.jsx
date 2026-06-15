import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [visitDate, setVisitDate] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    API.get("/rooms/" + id).then((res) => setRoom(res.data));
  }, [id]);

  const bookRoom = async (e) => {
    e.preventDefault();
    await API.post("/bookings", { roomId: id, visitDate, message });
    setNotice("Booking request sent successfully.");
  };

  if (!room) return <p className="center-text">Loading...</p>;

  return (
    <main className="container details-layout">
      <section className="details-card">
        <img src={room.image} alt={room.title} className="details-img" />
        <div>
          <h1>{room.title}</h1>
          <p>{room.location}</p>
          <p className="price big">₹{room.price}/month</p>
          <p>{room.description}</p>
        </div>
      </section>
      <aside className="booking-box">
        <h2>Book a Visit</h2>
        {notice && <p className="alert success">{notice}</p>}
        <form onSubmit={bookRoom}>
          <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} required />
          <textarea rows="4" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button className="btn full" type="submit">Send Booking Request</button>
        </form>
      </aside>
    </main>
  );
};

export default RoomDetails;
