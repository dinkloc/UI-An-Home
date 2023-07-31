const URL = "http://localhost:3000/api/v1";
const getBookings = async () => {
  const res = await fetch(`${URL}/bookings`);
  if (!res.ok) throw Error("Failed getting bookings");
  const { data } = await res.json();
  return data;
};

export { getBookings };
