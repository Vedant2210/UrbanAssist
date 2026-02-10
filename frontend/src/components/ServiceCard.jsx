import { Link } from "react-router-dom";
import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";

const ServiceCard = ({ title, img, desc, link }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    if (loaded) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
      });
    }
  }, [loaded]);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.06,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-[#1A1A1A] p-6 rounded-xl shadow-lg cursor-pointer transition"
    >
      {/* Show Skeleton until image loads */}
      {!loaded && (
        <div className="w-full h-48 bg-gray-700 rounded-lg animate-pulse mb-4"></div>
      )}

      <img
        ref={imgRef}
        src={img}
        alt={title}
        className={`w-full h-48 object-cover rounded-lg mb-4 ${
          loaded ? "block" : "hidden"
        }`}
        onLoad={() => setLoaded(true)}
      />

      <h3 className="text-2xl font-semibold text-[#00E8FF] mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{desc}</p>

      <Link to={`/book/${title.toLowerCase()}`}>
  <button className="bg-[#00E8FF] text-black px-6 py-2 rounded-md hover:bg-white transition">
    Book Now →
  </button>
</Link>

    </div>
  );
};

export default ServiceCard;
