import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) return <Spinner />;
  if (isLoading) return <Spinner />;
  const filterParams = searchParams.get("discount") || "all";
  const sortByParams = searchParams.get("sortBy") || "name-asc";
  let filterCabins;
  if (filterParams === "all") filterCabins = cabins.cabin;
  if (filterParams === "no-discount")
    filterCabins = cabins.cabin.filter((cabin) => cabin.discount === 0);
  if (filterParams === "discount")
    filterCabins = cabins.cabin.filter((cabin) => cabin.discount > 0);
  const [field, direction] = sortByParams.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabins.sort((a, b) => {
    return (a[field] - b[field]) * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin._id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
};

export default CabinTable;
