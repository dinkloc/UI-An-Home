import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

const useRecentBookings = () => {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(numDays),
    queryKey: ["bookings", `last-${numDays}`],
  });
  return { isLoading, bookings };
};

export { useRecentBookings };
