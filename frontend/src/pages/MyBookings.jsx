import { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `https://urbanassist-1.onrender.com/api/bookings/user/${user.id}`
        );

        setBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="pt-28 px-10">
      <h1 className="text-4xl font-bold text-center text-[#38BDF8] mb-8">
        My Bookings 📌
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-400">No bookings found ❌</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-[#14141B] p-6 rounded-xl border border-white/10 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-[#8B5CF6]">
                {b.service.toUpperCase()}
              </h2>

              <p className="text-gray-300 mt-2">
                📍 Address: {b.address}
              </p>

              <p className="text-gray-300">
                🗓️ Date: {b.date} | ⏰ Time: {b.time}
              </p>

              <p className="text-gray-300 mt-2">
                👨‍🔧 Provider: {b.assignedProvider.providerName}
              </p>

              <p className="text-gray-300">
                📞 Provider Contact: {b.assignedProvider.providerPhone}
              </p>

              <p className="text-green-400 font-bold mt-2">
                Status: {b.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
