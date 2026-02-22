// import { useEffect, useState } from "react";
// import axios from "axios";

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/bookings/user/${user.id}`
//         );

//         setBookings(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   return (
//     <div className="pt-28 px-10">
//       <h1 className="text-4xl font-bold text-center text-[#38BDF8] mb-8">
//         My Bookings 📌
//       </h1>

//       {bookings.length === 0 ? (
//         <p className="text-center text-gray-400">No bookings found ❌</p>
//       ) : (
//         <div className="grid gap-6">
//           {bookings.map((b) => (
//             <div
//               key={b._id}
//               className="bg-[#14141B] p-6 rounded-xl border border-white/10 shadow-lg"
//             >
//               <h2 className="text-2xl font-bold text-[#8B5CF6]">
//                 {b.service.toUpperCase()}
//               </h2>

//               <p className="text-gray-300 mt-2">
//                 📍 Address: {b.address}
//               </p>

//               <p className="text-gray-300">
//                 🗓️ Date: {b.date} | ⏰ Time: {b.time}
//               </p>

//               <p className="text-gray-300 mt-2">
//                 👨‍🔧 Provider: {b.assignedProvider.providerName}
//               </p>

//               <p className="text-gray-300">
//                 📞 Provider Contact: {b.assignedProvider.providerPhone}
//               </p>

//               <p className="text-green-400 font-bold mt-2">
//                 Status: {b.status}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBookings;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         if (!user) {
//           alert("Please login first ❌");
//           return;
//         }

//         const res = await axios.get(
//           `https://urbanassist-1.onrender.com/api/bookings/user/${user.id}`
//         );

//         setBookings(res.data || []);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         alert("Failed to load bookings ❌");
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#0B0B0F] text-white">
//       <Navbar />

//       <div className="pt-28 px-6 max-w-5xl mx-auto">
//         <h1 className="text-4xl font-bold text-[#38BDF8] mb-8 text-center">
//           My Bookings 📌
//         </h1>

//         {loading ? (
//           <p className="text-center text-gray-400">Loading bookings...</p>
//         ) : bookings.length === 0 ? (
//           <p className="text-center text-gray-400">
//             No bookings found ❌
//           </p>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6">
//             {bookings.map((booking) => (
//               <div
//                 key={booking._id}
//                 className="bg-[#14141B] p-6 rounded-xl border border-white/10 shadow-lg"
//               >
//                 <h2 className="text-xl font-bold text-[#00E8FF]">
//                   {booking.service.toUpperCase()}
//                 </h2>

//                 <p className="text-gray-300 mt-2">
//                   <span className="font-semibold text-white">Date:</span>{" "}
//                   {booking.date}
//                 </p>

//                 <p className="text-gray-300">
//                   <span className="font-semibold text-white">Time:</span>{" "}
//                   {booking.time}
//                 </p>

//                 <p className="text-gray-300">
//                   <span className="font-semibold text-white">Pincode:</span>{" "}
//                   {booking.pincode}
//                 </p>

//                 <p className="text-gray-300 mt-2">
//                   <span className="font-semibold text-white">Provider:</span>{" "}
//                   {booking.providerAssigned || "Assigning soon..."}
//                 </p>

//                 <p className="text-gray-300">
//                   <span className="font-semibold text-white">Provider Phone:</span>{" "}
//                   {booking.providerPhone || "Not available yet"}
//                 </p>

//                 <p className="text-gray-400 text-sm mt-2">
//                   Address: {booking.address}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyBookings;
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!user || !user.id) {
          alert("User not logged in ❌");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/bookings/user/${user.id}`
        );

        setBookings(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Booking Fetch Error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to load bookings ❌");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <Navbar />

      <div className="pt-28 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#38BDF8] mb-8 text-center">
          My Bookings 📌
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-400">No bookings found ❌</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-[#14141B] p-6 rounded-xl border border-white/10 shadow-lg"
              >
                <h2 className="text-xl font-bold text-[#00E8FF]">
                  {b.service.toUpperCase()}
                </h2>

                <p className="text-gray-300 mt-2">
                  <span className="font-semibold text-white">Date:</span> {b.date}
                </p>

                <p className="text-gray-300">
                  <span className="font-semibold text-white">Time:</span> {b.time}
                </p>

                <p className="text-gray-300">
                  <span className="font-semibold text-white">Pincode:</span>{" "}
                  {b.pincode}
                </p>

                <p className="text-gray-300 mt-2">
                  <span className="font-semibold text-white">Provider:</span>{" "}
                  {b.providerAssigned || "Assigning soon..."}
                </p>

                <p className="text-gray-300">
                  <span className="font-semibold text-white">Provider Phone:</span>{" "}
                  {b.providerPhone || "Not assigned yet"}
                </p>

                <p className="text-gray-400 text-sm mt-3">
                  Address: {b.address}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

