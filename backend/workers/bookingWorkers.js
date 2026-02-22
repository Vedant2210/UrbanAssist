// require("dotenv").config();
// console.log("Worker REDIS_URL:", process.env.REDIS_URL);

// const { Worker } = require("bullmq");
// const redis = require("../config/redis");
// const Provider = require("../models/Provider");
// const Booking = require("../models/Booking");

// const convertTimeToMinutes = (time) => {
//   const [h, m] = time.split(":").map(Number);
//   return h * 60 + m;
// };

// const worker = new Worker(
//   "bookingQueue",
//   async (job) => {
//     const { bookingId } = job.data;

//     const booking = await Booking.findById(bookingId);
//     if (!booking) return;

//     const bookingTime = convertTimeToMinutes(booking.time);

//     const providers = await Provider.find({
//       serviceType: booking.service,
//       pincodes: booking.pincode,
//     });

//     const availableProviders = providers.filter((p) => {
//       const start = convertTimeToMinutes(p.availability.startTime);
//       const end = convertTimeToMinutes(p.availability.endTime);
//       return bookingTime >= start && bookingTime <= end;
//     });

//     if (availableProviders.length === 0) {
//       booking.providerAssigned = "Not Available";
//       await booking.save();
//       return;
//     }

//     const assigned =
//       availableProviders[Math.floor(Math.random() * availableProviders.length)];

//     booking.providerAssigned = assigned.name;
//     booking.providerPhone = assigned.phone;

//     await booking.save();
//   },
//   { connection: redis }
// );

// console.log("Booking Worker Running ✅");

require("dotenv").config();

const mongoose = require("mongoose");
const { Worker } = require("bullmq");
const redis = require("../config/redis");
const Provider = require("../models/Provider");
const Booking = require("../models/Booking");
const twilio = require("twilio");

// Connect MongoDB inside worker
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Worker MongoDB Connected ✅"))
  .catch((err) => console.log("Worker MongoDB Error ❌", err.message));

// Twilio setup
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const worker = new Worker(
  "bookingQueue",
  async (job) => {
    try {
      const { bookingId } = job.data;

      const booking = await Booking.findById(bookingId);
      if (!booking) return;

      console.log("Processing booking:", bookingId);

      // Convert service to lowercase for matching
      const serviceName = booking.service.toLowerCase();

      const providers = await Provider.find({
        serviceType: serviceName,
        pincodes: booking.pincode,
      });

      if (providers.length === 0) {
        booking.providerAssigned = "Not Available";
        await booking.save();
        console.log("No providers found ❌");
        return;
      }

      const assigned = providers[Math.floor(Math.random() * providers.length)];

      booking.providerAssigned = assigned.name;
      booking.providerPhone = assigned.phone;

      await booking.save();
      console.log("Provider Assigned ✅", assigned.name);

      // Send SMS only if Twilio config exists
      if (process.env.TWILIO_PHONE) {
        await client.messages.create({
          body: `UrbanAssist Booking Confirmed ✅\nService: ${booking.service}\nProvider: ${assigned.name}\nPhone: ${assigned.phone}\nDate: ${booking.date}\nTime: ${booking.time}`,
          from: process.env.TWILIO_PHONE,
          to: booking.phone,
        });

        console.log("SMS Sent ✅");
      } else {
        console.log("Twilio not configured properly ❌");
      }
    } catch (error) {
      console.log("Worker Error ❌", error.message);
    }
  },
  { connection: redis }
);

console.log("Booking Worker Running ✅");
