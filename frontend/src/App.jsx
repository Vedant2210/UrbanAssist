import { Routes, Route, Navigate } from "react-router-dom";
import HomeCook from "./pages/HomeCook";
import Gardening from "./pages/Gardening";
import PestControl from "./pages/PestControl";
import Subscribe from "./pages/Subscribe";
import Hero from "./components/Hero";
import BookingPage from "./components/BookingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import MyBookings from "./pages/MyBookings";

const App = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <Routes>
        
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/hero" />} />

        {/* Protected Hero */}
        <Route
          path="/hero"
          element={
            <ProtectedRoute>
              <Hero />
            </ProtectedRoute>
          }
        />

        {/* Protected Booking Page */}
        <Route
          path="/book/:serviceName"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />

        {/* Protected My Bookings */}
        <Route
          path="/mybookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/homecook" element={<HomeCook />} />
        <Route path="/gardening" element={<Gardening />} />
        <Route path="/pestcontrol" element={<PestControl />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </div>
  );
};

export default App;
