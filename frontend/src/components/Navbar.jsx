import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef(null);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully ✅");

    navigate("/login");
    window.location.reload();
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4
      backdrop-blur-lg border-b border-white/10 bg-black/30"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/hero">
          <h1 className="text-2xl font-bold text-[#8B5CF6]">UrbanAssist</h1>
        </Link>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-200 items-center">
          {isLoggedIn ? (
            <>
              <li className="hover:text-[#38BDF8] transition">
                <Link to="/hero">Home</Link>
              </li>

              <li className="hover:text-[#38BDF8] transition">
                <Link to="/mybookings">My Bookings</Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-[#38BDF8] transition">
                <Link to="/login">Login</Link>
              </li>

              <li className="hover:text-[#38BDF8] transition">
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-[#14141B] rounded-xl p-4 border border-white/10">
          <ul className="flex flex-col gap-4 text-gray-200">
            {isLoggedIn ? (
              <>
                <li onClick={() => setMenuOpen(false)}>
                  <Link to="/hero" className="hover:text-[#38BDF8] transition">
                    Home
                  </Link>
                </li>

                <li onClick={() => setMenuOpen(false)}>
                  <Link
                    to="/mybookings"
                    className="hover:text-[#38BDF8] transition"
                  >
                    My Bookings
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition w-full"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li onClick={() => setMenuOpen(false)}>
                  <Link to="/login" className="hover:text-[#38BDF8] transition">
                    Login
                  </Link>
                </li>

                <li onClick={() => setMenuOpen(false)}>
                  <Link to="/signup" className="hover:text-[#38BDF8] transition">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
