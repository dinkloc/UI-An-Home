const URL = "http://127.0.0.1:3000/api/v1";
const getCabins = async () => {
  const res = await fetch(`${URL}/cabins`);
  if (!res.ok) throw Error("failed getting cabins");
  const { data } = await res.json();
  return data;
};

const deleteCabin = async (id) => {
  await fetch(`${URL}/cabins/${id}`, { method: "DELETE" }).then((response) => {
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
  });
};

export { getCabins, deleteCabin };
