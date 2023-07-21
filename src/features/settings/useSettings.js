import { useQuery } from "@tanstack/react-query";
import { getSetting } from "../../services/apiSettings";

const useCabins = () => {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSetting,
  });
  return { isLoading, settings, error };
};

export default useCabins;
