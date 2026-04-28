import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("SENDING DATA:", data);

    if (!data.name || !data.email || !data.password) {
      return alert("All fields required");
    }

    try {
      const res = await registerUser(data);

      console.log("REGISTER RESPONSE:", res.data);

      alert("Registered successfully ✅");
      navigate("/login");
    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data || err.message);
      alert(err.response?.data || "Register failed ❌");
    }
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleRegister}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}