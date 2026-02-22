// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema(
//   {
//     userId: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "User",
//   required: true,
// },
//     service: { type: String, required: true, lowercase: true },

//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },

//     pincode: { type: String, required: true },

//     date: { type: String, required: true }, // "2026-02-10"
//     time: { type: String, required: true }, // "09:30"

//     assignedProvider: {
//       providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
//       providerName: String,
//       providerPhone: String,
//     },

//     status: {
//       type: String,
//       default: "Assigned",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Booking", bookingSchema);


const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },

    providerAssigned: { type: String },
    providerPhone: { type: String },
  },
  { timestamps: true }
);

// Indexes
bookingSchema.index({ userId: 1 });
bookingSchema.index({ pincode: 1 });
bookingSchema.index({ service: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
