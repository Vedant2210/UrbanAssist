import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);

      alert("Signup Successful ✅ Please Login");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Signup Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0B0B0F] text-white">
      <div className="bg-[#14141B] p-8 rounded-xl shadow-lg w-[400px] border border-white/10">
        <h2 className="text-3xl font-bold text-center text-[#38BDF8] mb-6">
          Signup
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded bg-black text-white border border-white/10"
            required
          />

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
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 rounded bg-black text-white border border-white/10"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded bg-black text-white border border-white/10"
            required
          />

          <button className="bg-[#38BDF8] text-black py-3 rounded font-bold hover:bg-white transition">
            Create Account 🚀
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#38BDF8] font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
