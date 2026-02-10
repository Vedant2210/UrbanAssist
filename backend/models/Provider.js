const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
      lowercase: true,
    },

    availability: {
      startTime: { type: String, required: true }, // "08:00"
      endTime: { type: String, required: true },   // "10:00"
    },

    pincodes: {
      type: [String], // ["226010", "226021"]
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 4.0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Provider", providerSchema);
