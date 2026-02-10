import { useState, useEffect } from "react";
import axios from "axios";

const BookingForm = ({ serviceName }) => {
  const [formData, setFormData] = useState({
    service: serviceName,
    name: "",
    phone: "",
    address: "",
    pincode: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      service: serviceName,
    }));
  }, [serviceName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first ❌");
      return;
    }

    const bookingData = {
      ...formData,
      userId: user.id,
    };

    console.log("Sending booking:", bookingData);

    const res = await axios.post(
      "https://urbanassist-1.onrender.com/api/bookings",
      bookingData
    );

    alert(`Booking Confirmed ✅\nProvider Assigned: ${res.data.providerAssigned}`);

    setFormData({
      service: serviceName,
      name: "",
      phone: "",
      address: "",
      pincode: "",
      date: "",
      time: "",
    });

  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Booking Failed ❌");
  }
};


  return (
    <div className="max-w-xl mx-auto bg-[#14141B] p-8 rounded-xl shadow-lg mt-10 border border-white/10">
      <h2 className="text-2xl font-bold text-center text-[#38BDF8] mb-6">
        Book {serviceName.toUpperCase()}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Service */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Service Type</label>
          <input
            type="text"
            value={formData.service}
            className="p-3 rounded bg-black text-gray-400 border border-white/10"
            readOnly
          />
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded bg-black text-white border border-white/10"
            required
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Contact Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter Contact Number"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 rounded bg-black text-white border border-white/10"
            required
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Address</label>
          <textarea
            name="address"
            placeholder="Enter Full Address"
            value={formData.address}
            onChange={handleChange}
            className="p-3 rounded bg-black text-white border border-white/10"
            required
          />
        </div>

        {/* Pincode */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Pincode</label>
          <input
            type="text"
            name="pincode"
            placeholder="Enter Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="p-3 rounded bg-black text-white border border-white/10"
            required
          />
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Booking Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="p-3 rounded bg-black text-white border border-white/10"
            required
          />
        </div>

        {/* Time */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Booking Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="p-3 rounded bg-black text-white border border-white/10"
            required
          />
        </div>

        <button className="bg-[#38BDF8] text-black py-3 rounded font-bold hover:bg-white transition">
          Confirm Booking 🚀
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
