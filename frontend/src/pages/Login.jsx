import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("LOGIN DATA:", data); // 🔥 DEBUG

    if (!data.email || !data.password) {
      return alert("Enter email & password");
    }

    try {
      const res = await loginUser(data);

      console.log("RESPONSE:", res.data); // 🔥 DEBUG

      localStorage.setItem("token", res.data.token);

      alert("Login success ✅");

      navigate("/"); // redirect to home

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data || "Login failed ❌");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Login</h2>

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

        <button className="btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}