import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address ❌");
      return;
    }

    // ✅ Password validation
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters ❌");
      return;
    }

    try {
      const res = await axios.post(
        "https://urbanassist-1.onrender.com/api/auth/login",
        formData
      );

      alert("Login Successful ✅");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/hero");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0B0B0F] text-white">
      <div className="bg-[#14141B] p-8 rounded-xl shadow-lg w-[400px] border border-white/10">
        <h2 className="text-3xl font-bold text-center text-[#38BDF8] mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded bg-black text-white border border-white/10"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded bg-black text-white border border-white/10"
            required
          />

          <button className="bg-[#38BDF8] text-black py-3 rounded font-bold hover:bg-white transition">
            Login 🔑
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          New user?{" "}
          <Link to="/signup" className="text-[#38BDF8] font-bold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
