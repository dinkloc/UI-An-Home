import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingin } = useMutation({
    mutationFn: ({ id, breakfast }) =>
      editBooking({ status: "checked-in", isPaid: true, ...breakfast }, id),
    onSuccess: (data) => {
      toast.success(`Booking #${data._id} successfully checked-in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings");
    },
    onError: () => toast.error("There was an error while checking in"),
  });
  return { checkin, isCheckingin };
}
