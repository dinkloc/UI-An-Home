const URL = "http://127.0.0.1:3000/api/v1";
const getSetting = async () => {
  const res = await fetch(`${URL}/settings`);
  if (!res.ok) throw Error("failed getting setting");
  const { data } = await res.json();
  return data;
};

const editSetting = async (newSetting, id) => {
  try {
    const res = await fetch(`${URL}/settings/${id}`, {
      method: "PATCH",
      body: JSON.stringify(newSetting),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error();
  } catch {
    throw Error("Failed updating your setting");
  }
};
export { getSetting, editSetting };
