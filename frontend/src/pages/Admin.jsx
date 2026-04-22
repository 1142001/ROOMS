import { useEffect, useState } from "react";
import { createRoom, getRooms, deleteRoom } from "../api";

export default function Admin() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    image: ""
  });

  const token = localStorage.getItem("token");

  const fetchRooms = () => {
    getRooms()
      .then((res) => setRooms(res.data))
      .catch((err) => {
        console.log("FETCH ROOMS ERROR:", err);
      });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreate = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    if (!form.title || !form.price || !form.location) {
      alert("All fields are required");
      return;
    }

    try {
      const payload = {
        title: form.title,
        price: form.price,
        location: form.location,
        image: form.image
      };

      const res = await createRoom(payload, token);
      console.log("ROOM ADDED:", res.data);

      alert("Room added successfully ✅");

      setForm({
        title: "",
        price: "",
        location: "",
        image: ""
      });

      fetchRooms();
    } catch (err) {
      console.log("ADD ROOM ERROR:", err.response?.data || err.message);
      alert(err.response?.data || "Failed to add room");
    }
  };

  const handleDelete = async (id) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await deleteRoom(id, token);
      alert("Room deleted ✅");
      fetchRooms();
    } catch (err) {
      console.log("DELETE ROOM ERROR:", err.response?.data || err.message);
      alert(err.response?.data || "Failed to delete room");
    }
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      <div className="card">
        <input
          type="text"
          placeholder="Room Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button className="btn" onClick={handleCreate}>
          Add Room
        </button>
      </div>

      <hr />

      <h3>All Rooms</h3>

      {rooms.length === 0 ? (
        <p>No rooms found</p>
      ) : (
        rooms.map((room) => (
          <div key={room._id} className="card" style={{ marginBottom: "15px" }}>
            {room.image && (
              <img
                src={room.image}
                alt={room.title}
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px"
                }}
              />
            )}

            <h4>{room.title}</h4>
            <p>₹ {room.price}</p>
            <p>{room.location}</p>

            <button className="btn" onClick={() => handleDelete(room._id)}>
              Delete Room
            </button>
          </div>
        ))
      )}
    </div>
  );
}