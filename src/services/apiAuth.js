const URL = "http://localhost:3000/api/v1";
const login = async ({ email, password }) => {
  try {
    const res = await fetch(`${URL}/users/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error("failed to login");
    const { token } = await res.json();
    return token;
  } catch {
    throw Error("Failed updating your cabin");
  }
};

export { login };
