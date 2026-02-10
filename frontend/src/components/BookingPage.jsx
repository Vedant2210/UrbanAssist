import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";

const BookingPage = () => {
  const { serviceName } = useParams();

  return (
    <div className="pt-28 text-white px-6">
      <h1 className="text-4xl font-bold text-center text-[#8B5CF6]">
        Booking Service
      </h1>

      <p className="text-center text-gray-300 mt-2">
        Fill the form below to book your service.
      </p>

      <BookingForm serviceName={serviceName} />
    </div>
  );
};

export default BookingPage;
