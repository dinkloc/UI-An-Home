const URL = "http://127.0.0.1:3000/api/v1";
// const token = localStorage.getItem("token");
// console.log("token", token);
const getBookings = async (page, token) => {
  if (page) {
    const res = await fetch(`${URL}/bookings?page=${page}&limit=${6}`, {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw Error("Failed getting bookings");
    const { data } = await res.json();
    return data;
  }

  const res = await fetch(`${URL}/bookings`);
  if (!res.ok) throw Error("Failed getting bookings");
  const { data } = await res.json();
  return data;
};

const getBooking = async (id) => {
  try {
    const res = await fetch(`${URL}/bookings/${id}`);
    if (!res.ok) throw Error("Failed getting bookings");
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw Error("Failed To Get Booking");
  }
};

const editBooking = async (newBooking, id) => {
  try {
    const res = await fetch(`${URL}/bookings/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ ...newBooking }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw Error("Failed updating your booking");
  }
};

const deleteBooking = async (id) => {
  await fetch(`${URL}/bookings/${id}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
  });
};

const getBookingsAfterDate = async (date) => {
  try {
    const res = await fetch(`${URL}/bookings/stats/${date}`);
    if (!res.ok) {
      throw Error("Failed getting bookings after date");
    }
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw Error("Failed getting bookings after date");
  }
};
const getStaysAfterDate = async (date) => {
  try {
    const res = await fetch(`${URL}/bookings/stayAfterDate/${date}`);
    if (!res.ok) {
      throw Error("Failed getting stays after date");
    }
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw Error("Failed getting stays after date");
  }
};
export {
  getBookings,
  getBooking,
  editBooking,
  deleteBooking,
  getBookingsAfterDate,
  getStaysAfterDate,
};
