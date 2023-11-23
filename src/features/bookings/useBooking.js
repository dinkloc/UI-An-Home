import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

const useBooking = () => {
  const { _id } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", _id],
    queryFn: () => getBooking(_id),
    retry: false,
  });
  return { isLoading, booking, error };
};

export default useBooking;
