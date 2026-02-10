// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import Services from "./Services";
//   import { Link } from "react-router-dom";
// import Navbar from "./Navbar";
// const Hero = () => {
//   const heroRef = useRef(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(heroRef.current.children, {
//         opacity: 0,
//         y: 30,
//         stagger: 0.25,
//         duration: 1.2,
//         ease: "power3.out",
//       });
//     }, heroRef);

//     return () => ctx.revert(); // fixes reload disappearing issue
//   }, []);

//   return (
//     <div>
//     <Navbar/>
//     <section className="h-screen flex items-center justify-center text-center px-6 pt-24">
//       <div ref={heroRef}>
      

// {/* <Link to="/mybookings">
//   <button className="bg-[#38BDF8] text-black px-6 py-3 rounded-lg font-bold hover:bg-white transition">
//     My Bookings 📌
//   </button>
// </Link> */}

//         <h1 className="text-5xl md:text-6xl font-bold mb-4">
//           Welcome to <span className="text-[#00E8FF]">UrbanAssist</span>
//         </h1>

//         <p className="text-gray-400 max-w-xl mx-auto mb-8">
//           The smart way to report city issues and request municipal services.
//         </p>

//         <button className="px-8 py-3 bg-[#00E8FF] text-black font-semibold rounded-md hover:bg-white transition">
//           Get Started →
//         </button>
//       </div>

//     </section>
//    <Services/>
//     </div>
//   );
// };

// export default Hero;

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Services from "./Services";
import Navbar from "./Navbar";

const Hero = () => {
  const heroRef = useRef(null);
  const serviceRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ensure visible on refresh
      gsap.set(heroRef.current.children, { opacity: 1 });

      gsap.from(heroRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.25,
        duration: 1.2,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleGetStarted = () => {
    serviceRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Navbar />

      <section className="h-screen flex items-center justify-center text-center px-6 pt-24">
        <div ref={heroRef}>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-[#00E8FF]">UrbanAssist</span>
          </h1>

          <p className="text-gray-400 max-w-xl mx-auto mb-8">
  Need a cook, plumber, electrician or cleaner? UrbanAssist connects you with the best in minutes.
</p>


          <button
            onClick={handleGetStarted}
            className="px-8 py-3 bg-[#00E8FF] text-black font-semibold rounded-md hover:bg-white transition"
          >
            Get Started →
          </button>
        </div>
      </section>

      {/* Services Section */}
      <div ref={serviceRef}>
        <Services />
      </div>
    </div>
  );
};

export default Hero;
