// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const bookingRoutes = require("./routes/bookingRoutes");
// const authRoutes = require("./routes/authRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/auth", authRoutes);


// // Default route
// app.get("/", (req, res) => {
//   res.send("Urban Assist Backend Running 🚀");
// });

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected ✅"))
//   .catch((err) => console.log("MongoDB Error ❌", err));

// // Start server
// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");
const limiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(limiter);
console.log("REDIS URL:", process.env.REDIS_URL);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is healthy 🚀" });
});

// Default route
app.get("/", (req, res) => {
  res.send("Urban Assist Backend Running 🚀");
});

// Error handler
app.use(errorHandler);

// Start Server after DB connect
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("MongoDB Error ❌", err.message));
