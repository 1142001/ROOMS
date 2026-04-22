import { useEffect, useState } from "react";
import { getRooms, bookRoom } from "../api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState({
    fromDate: "",
    toDate: ""
  });
  const [selectedRoom, setSelectedRoom] = useState(null);

  const token = localStorage.getItem("token");

  const fetchRooms = () => {
    getRooms()
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        console.log("FETCH ROOMS ERROR:", err.response?.data || err.message);
      });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSearch = async () => {
    if (!filter.fromDate || !filter.toDate) {
      alert("Please select both dates");
      return;
    }

    try {
      const res = await getRooms(filter.fromDate, filter.toDate);
      console.log("SEARCH RESULT:", res.data);
      setRooms(res.data);
    } catch (err) {
      console.log("SEARCH ERROR:", err.response?.data || err.message);
      alert(err.response?.data || "Search failed");
    }
  };

  const handleReset = () => {
    setFilter({
      fromDate: "",
      toDate: ""
    });
    setSelectedRoom(null);
    fetchRooms();
  };

  const handleBooking = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    if (!selectedRoom) {
      alert("Please select a room");
      return;
    }

    if (!filter.fromDate || !filter.toDate) {
      alert("Please select booking dates");
      return;
    }

    try {
      const payload = {
        roomId: selectedRoom._id,
        fromDate: filter.fromDate,
        toDate: filter.toDate
      };

      const res = await bookRoom(payload, token);
      console.log("BOOKING SUCCESS:", res.data);

      alert("Room booked successfully ✅");
      setSelectedRoom(null);
    } catch (err) {
      console.log("BOOKING ERROR:", err.response?.data || err.message);
      alert(err.response?.data || "Booking failed");
    }
  };

  return (
    <div className="container">
      <h2>Available Rooms</h2>

      <div className="card" style={{ marginBottom: "20px" }}>
        <h3>Search Available Rooms</h3>

        <input
          type="date"
          value={filter.fromDate}
          onChange={(e) => setFilter({ ...filter, fromDate: e.target.value })}
        />

        <input
          type="date"
          value={filter.toDate}
          onChange={(e) => setFilter({ ...filter, toDate: e.target.value })}
        />

        <button className="btn" onClick={handleSearch}>
          Search Room
        </button>

        <button
          className="btn"
          onClick={handleReset}
          style={{ marginTop: "10px", background: "#6c757d" }}
        >
          Reset
        </button>
      </div>

      <div className="grid">
        {rooms.length === 0 ? (
          <p>No rooms found</p>
        ) : (
          rooms.map((room) => (
            <div className="card" key={room._id}>
              {room.image && (
                <img
                  src={room.image}
                  alt={room.title}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "10px"
                  }}
                />
              )}

              <h3>{room.title}</h3>
              <p>{room.location}</p>
              <p>₹ {room.price}</p>

              <button
                className="btn"
                onClick={() => setSelectedRoom(room)}
              >
                Select Room
              </button>
            </div>
          ))
        )}
      </div>

      {selectedRoom && (
        <div className="card" style={{ marginTop: "30px" }}>
          <h3>Selected Room</h3>
          <p><strong>{selectedRoom.title}</strong></p>
          <p>{selectedRoom.location}</p>
          <p>₹ {selectedRoom.price}</p>

          <button className="btn" onClick={handleBooking}>
            Book Now
          </button>
        </div>
      )}
    </div>
  );
}