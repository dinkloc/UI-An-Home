import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBookingAPI(id),
    onSuccess: () => {
      toast.success("booking successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteBooking, isDeleting };
};
export default useDeleteBooking;
