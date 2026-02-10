const express = require("express");
const Booking = require("../models/Booking");
const Provider = require("../models/Provider");
const sendSMS = require("../utils/sendSMS");

const { isTimeInRange } = require("../utils/timeUtils");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId ,service, pincode, time, name, phone, address, date } = req.body;

    // 1. Find providers who match service + pincode
    if (!userId) {
  return res.status(400).json({ message: "UserId missing. Please login again." });
}
    const providers = await Provider.find({
      serviceType: service.toLowerCase(),
      pincodes: { $in: [pincode] },
    });

    if (providers.length === 0) {
      return res.status(404).json({
        message: "No providers available in your area ❌",
      });
    }

    // 2. Filter providers based on time availability
    const availableProviders = providers.filter((provider) =>
      isTimeInRange(time, provider.availability.startTime, provider.availability.endTime)
    );

    if (availableProviders.length === 0) {
      return res.status(404).json({
        message: "No providers available at selected time ❌",
      });
    }

    // 3. Random assignment
    const assignedProvider =
      availableProviders[Math.floor(Math.random() * availableProviders.length)];

    // 4. Create booking with assigned provider
    const booking = new Booking({
      userId,
      service,
      name,
      phone,
      address,
      pincode,
      date,
      time,
      assignedProvider: {
        providerId: assignedProvider._id,
        providerName: assignedProvider.name,
        providerPhone: assignedProvider.phone,
      },
      status: "Assigned",
    });

    await booking.save();
    await sendSMS(
  phone,
  `UrbanAssist Booking Confirmed ✅
Service: ${service}
Provider: ${assignedProvider.name}
Provider Phone: ${assignedProvider.phone}
Date: ${date}
Time: ${time}`
);

    res.status(201).json({
      message: "Booking Confirmed ✅",
      providerAssigned: assignedProvider.name,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Booking Failed ❌",
      error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
});
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
});


module.exports = router;
