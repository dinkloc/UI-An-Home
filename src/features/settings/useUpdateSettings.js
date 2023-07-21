import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editSetting as editSettingAPI } from "../../services/apiSettings";

const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { mutate: editSetting, isLoading: isEditing } = useMutation({
    mutationFn: ({ newSetting, id }) => editSettingAPI(newSetting, id),
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editSetting, isEditing };
};

export default useUpdateSettings;
