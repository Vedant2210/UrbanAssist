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
    const { name, value } = e.target;

    // Allow only numbers in phone
    if (name === "phone" && !/^[0-9]*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Name Validation
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    if (!nameRegex.test(formData.name.trim())) {
      alert("Name must contain only letters (min 3 characters) ❌");
      return;
    }

    // ✅ Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address ❌");
      return;
    }

    // ✅ Phone Validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Phone number must be exactly 10 digits ❌");
      return;
    }

    // ✅ Password Validation (min 6 chars)
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long ❌");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);

      alert("Signup Successful ✅ Please Login");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Signup Failed Email and Phone already exists ❌");
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
            type="tel"
            name="phone"
            placeholder="10 Digit Phone Number"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
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
