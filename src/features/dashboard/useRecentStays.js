import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

const useRecentStays = () => {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(numDays),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.stats?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  return { isLoading, stays, numDays, confirmedStays };
};

export { useRecentStays };
