import supabase, { supabaseUrl } from "./supabase";

const URL = "http://127.0.0.1:3000/api/v1";
const getCabins = async () => {
  const res = await fetch(`${URL}/cabins`);
  if (!res.ok) throw Error("failed getting cabins");
  const { data } = await res.json();
  return data;
};

const deleteCabin = async (id) => {
  await fetch(`${URL}/cabins/${id}`, {
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

const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  console.log(imagePath);

  if (!id) {
    try {
      const res = await fetch(`${URL}/cabins`, {
        method: "POST",
        body: JSON.stringify({ ...newCabin, image: imagePath }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw Error();
      if (hasImagePath) return;
      const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);
      if (storageError) {
        throw new Error("Could not be create a Cabin");
      }
      const { data } = await res.json();
      return data;
    } catch {
      throw Error("Failed creating your cabin");
    }
  }
  try {
    const res = await fetch(`${URL}/cabins/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ ...newCabin, image: imagePath }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error();
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);
    if (storageError) {
      throw new Error("Could not be create a Cabin");
    }
  } catch {
    throw Error("Failed updating your cabin");
  }
};

export { getCabins, deleteCabin, createEditCabin };
