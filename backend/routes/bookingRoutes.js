// const express = require("express");
// const Booking = require("../models/Booking");
// const Provider = require("../models/Provider");
// const sendSMS = require("../utils/sendSMS");

// const { isTimeInRange } = require("../utils/timeUtils");

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { userId ,service, pincode, time, name, phone, address, date } = req.body;

//     // 1. Find providers who match service + pincode
//     if (!userId) {
//   return res.status(400).json({ message: "UserId missing. Please login again." });
// }
//     const providers = await Provider.find({
//       serviceType: service.toLowerCase(),
//       pincodes: { $in: [pincode] },
//     });

//     if (providers.length === 0) {
//       return res.status(404).json({
//         message: "No providers available in your area ❌",
//       });
//     }

//     // 2. Filter providers based on time availability
//     const availableProviders = providers.filter((provider) =>
//       isTimeInRange(time, provider.availability.startTime, provider.availability.endTime)
//     );

//     if (availableProviders.length === 0) {
//       return res.status(404).json({
//         message: "No providers available at selected time ❌",
//       });
//     }

//     // 3. Random assignment
//     const assignedProvider =
//       availableProviders[Math.floor(Math.random() * availableProviders.length)];

//     // 4. Create booking with assigned provider
//     const booking = new Booking({
//       userId,
//       service,
//       name,
//       phone,
//       address,
//       pincode,
//       date,
//       time,
//       assignedProvider: {
//         providerId: assignedProvider._id,
//         providerName: assignedProvider.name,
//         providerPhone: assignedProvider.phone,
//       },
//       status: "Assigned",
//     });

//     await booking.save();
//     await sendSMS(
//   phone,
//   `UrbanAssist Booking Confirmed ✅
// Service: ${service}
// Provider: ${assignedProvider.name}
// Provider Phone: ${assignedProvider.phone}
// Date: ${date}
// Time: ${time}`
// );

//     res.status(201).json({
//       message: "Booking Confirmed ✅",
//       providerAssigned: assignedProvider.name,
//       booking,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Booking Failed ❌",
//       error,
//     });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const bookings = await Booking.find().sort({ createdAt: -1 });
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching bookings", error });
//   }
// });
// router.get("/user/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });

//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching bookings", error });
//   }
// });


// module.exports = router;

const express = require("express");
const Booking = require("../models/Booking");
const bookingQueue = require("../queues/bookingQueue");

const router = express.Router();

// CREATE BOOKING
router.post("/", async (req, res) => {
  try {
    const { userId, service, name, phone, address, pincode, date, time } =
      req.body;

    if (!userId || !service || !name || !phone || !address || !pincode || !date || !time) {
      return res.status(400).json({ message: "All fields are required ❌" });
    }

    const booking = new Booking({
      userId,
      service,
      name,
      phone,
      address,
      pincode,
      date,
      time,
      providerAssigned: "Pending...",
    });

    await booking.save();

    // Add job to queue
    await bookingQueue.add("assignProvider", { bookingId: booking._id });

    res.status(201).json({
      message: "Booking created successfully ✅",
      bookingId: booking._id,
      providerAssigned: "Assigning soon...",
    });
  } catch (error) {
    console.log("BOOKING ERROR:", error.message);
    res.status(500).json({ message: "Booking failed ❌", error: error.message });
  }
});

// GET USER BOOKINGS
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings ❌" });
  }
});

module.exports = router;
