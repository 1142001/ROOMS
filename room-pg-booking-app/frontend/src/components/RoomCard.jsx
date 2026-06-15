import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <div className="card room-card">
      <img src={room.image} alt={room.title} />
      <div className="card-body">
        <div className="badge-row">
          <span className="badge">{room.type}</span>
          <span className={room.isAvailable ? "badge success" : "badge muted"}>
            {room.isAvailable ? "Available" : "Booked"}
          </span>
        </div>
        <h3>{room.title}</h3>
        <p className="muted-text">Location: {room.location}</p>
        <p className="price">₹{room.price}/month</p>
        <p>{room.description?.slice(0, 90)}...</p>
        <Link to={`/rooms/${room._id}`} className="btn full">View Details</Link>
      </div>
    </div>
  );
};

export default RoomCard;
