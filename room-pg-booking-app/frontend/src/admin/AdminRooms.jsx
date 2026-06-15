import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ title: "", location: "", price: "", description: "", type: "PG", gender: "Any", image: "" });

  const loadRooms = () => API.get("/rooms").then((res) => setRooms(res.data));

  useEffect(() => {
    loadRooms();
  }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addRoom = async (e) => {
    e.preventDefault();
    await API.post("/rooms", { ...form, price: Number(form.price) });
    setForm({ title: "", location: "", price: "", description: "", type: "PG", gender: "Any", image: "" });
    loadRooms();
  };

  const deleteRoom = async (id) => {
    await API.delete("/rooms/" + id);
    loadRooms();
  };

  return (
    <div>
      <h1>Manage Rooms</h1>
      <form className="admin-form" onSubmit={addRoom}>
        <input name="title" placeholder="Title" value={form.title} onChange={change} required />
        <input name="location" placeholder="Location" value={form.location} onChange={change} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={change} required />
        <input name="image" placeholder="Image URL" value={form.image} onChange={change} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={change} required />
        <button className="btn" type="submit">Add Room</button>
      </form>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Title</th><th>Location</th><th>Price</th><th>Action</th></tr></thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.title}</td><td>{room.location}</td><td>₹{room.price}</td>
                <td><button className="btn mini danger" onClick={() => deleteRoom(room._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRooms;
