import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  const handleOnChange = (event) => {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      value={sortBy}
      options={options}
      type="white"
      onChange={handleOnChange}
    ></Select>
  );
};

export default SortBy;
