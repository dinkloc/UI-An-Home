import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkout, isLoading: isCheckingout } = useMutation({
    mutationFn: (id) => editBooking({ status: "checked-out" }, id),
    onSuccess: (data) => {
      toast.success(`Booking #${data._id} successfully checked-out`);
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings");
    },
    onError: () => toast.error("There was an error while checking out"),
  });
  return { checkout, isCheckingout };
}
