import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log("SENDING DATA:", data); // 🔥 DEBUG

    if (!data.name || !data.email || !data.password) {
      return alert("All fields required");
    }

    try {
      await registerUser(data);
      alert("Registered!");
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data); // 🔥 IMPORTANT
      alert(err.response?.data || "Error");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Register</h2>

        <input
          placeholder="Name"
          value={data.name}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button className="btn" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}