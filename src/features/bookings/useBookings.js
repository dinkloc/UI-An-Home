import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const useBookings = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", page],
    queryFn: () => getBookings(page, token),
  });
  const { data: bookingsWithoutPaging } = useQuery({
    queryFn: () => getBookings(),
    queryKey: ["bookings"],
  });

  // prefetching
  // queryClient.prefetchQuery({
  //   queryKey: ["bookings", page + 1],
  //   queryFn: () => getBookings({ page: page + 1 }),
  // });

  // if (page >= 1) {
  //   queryClient.prefetchQuery({
  //     queryKey: ["bookings", page - 1],
  //     queryFn: () => getBookings({ page: page - 1 }),
  //   });
  // }
  return { isLoading, bookings, error, bookingsWithoutPaging };
};
export default useBookings;
