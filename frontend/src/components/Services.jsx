// import { useEffect, useRef, useState } from "react";
// import ServiceCard from "../components/ServiceCard";

// const Services = () => {

//   const services = [
//     {
//       title: "Home Cook",
//       img: "https://blog.swiggy.com/wp-content/uploads/2024/09/Image-1_Idli-Dosa-1024x538.png",
//       desc: "Hire a verified home cook for fresh homemade meals.",
//       link: "/homecook",
//     },
//     {
//       title: "Gardening",
//       img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
//       desc: "Professional plant care, balcony setup & maintenance.",
//       link: "/gardening",
//     },
//     {
//       title: "Pest Control",
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl9mo7e7anBbx2kKfG4P9blcnzIIcCxmnXPg&s",
//       desc: "Safe and affordable pest control for your home.",
//       link: "/pestcontrol",
//     },
//     {
//       title: "Electrician",
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkfzjwHX_XSZ_3JUaSxRDQ4hLN3AvyDbr3bg&s",
//       desc: "Electrical repairs, wiring & lighting solutions.",
//       link: "/electrician",
//     },
//     {
//       title: "Plumber",
//       img: "https://scoutnetworkblog.com/wp-content/uploads/2018/11/Plumber-Sink-201709-003.jpg",
//       desc: "Leak repairs, bathroom fittings & pipelines.",
//       link: "/plumber",
//     },
//     {
//       title: "AC Repair",
//       img: "https://assistor.in/uploads/services/17123933957.jpg",
//       desc: "AC servicing, installation & gas refill.",
//       link: "/ac-repair",
//     },
//     {
//       title: "Home Cleaning",
//       img: "https://images.unsplash.com/photo-1581579185169-6c1a07c3dfe7?auto=format&fit=crop&w=800&q=80",
//       desc: "Deep cleaning for kitchen, bathroom & full home.",
//       link: "/cleaning",
//     },
//     {
//       title: "Carpenter",
//       img: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=800&q=80",
//       desc: "Furniture repair & custom woodwork.",
//       link: "/carpenter",
//     },
//     {
//       title: "Salon at Home",
//       img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80",
//       desc: "Haircut, grooming & beauty services at home.",
//       link: "/salon",
//     },
//     {
//       title: "Massage & Spa",
//       img: "https://images.unsplash.com/photo-1556228724-4c1d52a1f6c3?auto=format&fit=crop&w=800&q=80",
//       desc: "Relaxing massage & spa therapy at home.",
//       link: "/spa",
//     },
//     {
//       title: "House Painting",
//       img: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80",
//       desc: "Interior & exterior painting with expert painters.",
//       link: "/painting",
//     },
//     {
//       title: "RO Service",
//       img: "https://images.unsplash.com/photo-1624048108444-1f49aefc2a9c?auto=format&fit=crop&w=800&q=80",
//       desc: "RO installation, servicing & filter replacement.",
//       link: "/ro-service",
//     },
//     {
//       title: "TV Installation",
//       img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
//       desc: "Wall mounting & TV setup services.",
//       link: "/tv-installation",
//     },
//     {
//       title: "Appliance Repair",
//       img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
//       desc: "Repair for fridge, washing machine & microwave.",
//       link: "/appliance-repair",
//     },
//     {
//       title: "Laptop Repair",
//       img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
//       desc: "Laptop repair, OS install & hardware fixes.",
//       link: "/laptop-repair",
//     },
//     {
//       title: "Car Wash",
//       img: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80",
//       desc: "Doorstep car wash & detailing services.",
//       link: "/car-wash",
//     },
//     {
//       title: "Packers & Movers",
//       img: "https://5.imimg.com/data5/PV/UJ/MY-1616994/packers-and-movers-500x500.jpg",
//       desc: "Safe & reliable home shifting services.",
//       link: "/packers-movers",
//     },
//     {
//       title: "CCTV Installation",
//       img: "https://media.licdn.com/dms/image/v2/D5612AQHkNtNokqwFdA/article-cover_image-shrink_720_1280/B56Zj1dy.BH8AI-/0/1756464886336?e=2147483647&v=beta&t=w9pGHiN5bAgvn4vx8tvZjaoiRLVEBFtdc_kkrN3YkHw",
//       desc: "Monthly service subscription with priority support.",
//       link: "/subscribe",
//     },
//   ];

// const ITEMS_PER_LOAD = 6;
//   const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
//   const loaderRef = useRef(null);

//   useEffect(() => {
//     if (!loaderRef.current) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         const first = entries[0];
//         if (
//           first.isIntersecting &&
//           visibleCount < services.length
//         ) {
//           setVisibleCount((prev) =>
//             Math.min(prev + ITEMS_PER_LOAD, services.length)
//           );
//         }
//       },
//       {
//         root: null,
//         rootMargin: "200px", // 🔥 important fix
//         threshold: 0,
//       }
//     );

//     observer.observe(loaderRef.current);

//     return () => observer.disconnect();
//   }, [visibleCount, services.length]);

//   return (
//     <div className="min-h-screen bg-[#0E0E0E] text-white pt-24 px-8">
//       <h2 className="text-4xl font-bold text-center text-[#00E8FF] mb-12">
//         Our Services
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//         {services.slice(0, visibleCount).map((service, i) => (
//           <ServiceCard key={service.link} {...service} />
//         ))}
//       </div>

//       {/* 👇 Observer Trigger */}
//       {visibleCount < services.length && (
//         <div
//           ref={loaderRef}
//           className="h-16 flex justify-center items-center text-gray-400"
//         >
//           Loading more services...
//         </div>
//       )}
//     </div>
//   );
// };

// export default Services;


import { useEffect, useRef, useState, useMemo } from "react";
import ServiceCard from "../components/ServiceCard";

const Services = () => {
  const services = useMemo(() => [
    {
      title: "Home Cook",
      img: "https://blog.swiggy.com/wp-content/uploads/2024/09/Image-1_Idli-Dosa-1024x538.png",
      desc: "Hire a verified home cook for fresh homemade meals.",
      link: "/homecook",
    },
    {
      title: "Gardening",
      img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
      desc: "Professional plant care, balcony setup & maintenance.",
      link: "/gardening",
    },
    {
      title: "Pest Control",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl9mo7e7anBbx2kKfG4P9blcnzIIcCxmnXPg&s",
      desc: "Safe and affordable pest control for your home.",
      link: "/pestcontrol",
    },
    {
      title: "Electrician",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkfzjwHX_XSZ_3JUaSxRDQ4hLN3AvyDbr3bg&s",
      desc: "Electrical repairs, wiring & lighting solutions.",
      link: "/electrician",
    },
    {
      title: "Plumber",
      img: "https://scoutnetworkblog.com/wp-content/uploads/2018/11/Plumber-Sink-201709-003.jpg",
      desc: "Leak repairs, bathroom fittings & pipelines.",
      link: "/plumber",
    },
    {
      title: "AC Repair",
      img: "https://assistor.in/uploads/services/17123933957.jpg",
      desc: "AC servicing, installation & gas refill.",
      link: "/ac-repair",
    },
    {
      title: "Home Cleaning",
      img: "https://images.unsplash.com/photo-1581579185169-6c1a07c3dfe7?auto=format&fit=crop&w=800&q=80",
      desc: "Deep cleaning for kitchen, bathroom & full home.",
      link: "/cleaning",
    },
    {
      title: "Carpenter",
      img: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=800&q=80",
      desc: "Furniture repair & custom woodwork.",
      link: "/carpenter",
    },
    {
      title: "Salon at Home",
      img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80",
      desc: "Haircut, grooming & beauty services at home.",
      link: "/salon",
    },
    {
      title: "Massage & Spa",
      img: "https://images.unsplash.com/photo-1556228724-4c1d52a1f6c3?auto=format&fit=crop&w=800&q=80",
      desc: "Relaxing massage & spa therapy at home.",
      link: "/spa",
    },
    {
      title: "House Painting",
      img: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80",
      desc: "Interior & exterior painting with expert painters.",
      link: "/painting",
    },
    {
      title: "RO Service",
      img: "https://images.unsplash.com/photo-1624048108444-1f49aefc2a9c?auto=format&fit=crop&w=800&q=80",
      desc: "RO installation, servicing & filter replacement.",
      link: "/ro-service",
    },
    {
      title: "TV Installation",
      img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
      desc: "Wall mounting & TV setup services.",
      link: "/tv-installation",
    },
    {
      title: "Appliance Repair",
      img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
      desc: "Repair for fridge, washing machine & microwave.",
      link: "/appliance-repair",
    },
    {
      title: "Laptop Repair",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      desc: "Laptop repair, OS install & hardware fixes.",
      link: "/laptop-repair",
    },
    {
      title: "Car Wash",
      img: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80",
      desc: "Doorstep car wash & detailing services.",
      link: "/car-wash",
    },
    {
      title: "Packers & Movers",
      img: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f?auto=format&fit=crop&w=800&q=80",
      desc: "Safe & reliable home shifting services.",
      link: "/packers-movers",
    },
    {
      title: "CCTV Installation",
      img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80",
      desc: "Monthly service subscription with priority support.",
      link: "/subscribe",
    },
  ], []);

  const ITEMS_PER_LOAD = 6;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_LOAD, services.length)
          );
        }
      },
      {
        root: null,
        rootMargin: "600px",
        threshold: 0,
      }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [services.length]);

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white pt-24 px-8">
      <h2 className="text-4xl font-bold text-center text-[#00E8FF] mb-12">
        Our Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.slice(0, visibleCount).map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>

      {visibleCount < services.length && (
        <div
          ref={loaderRef}
          className="h-16 flex justify-center items-center text-gray-400"
        >
          Loading more services...
        </div>
      )}
    </div>
  );
};

export default Services;
