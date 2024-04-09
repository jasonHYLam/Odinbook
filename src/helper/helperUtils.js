export async function fetchData(endpoint, method, data) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`,
      {
        method: method,
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: data,
      }
    );
    return response;
  } catch (err) {
    if (err) return err;
  }
}

export async function fetchDataWithImage(endpoint, method, data) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`,
      {
        method: method,
        mode: "cors",
        credentials: "include",
        body: data,
      }
    );
    return response;
  } catch (err) {
    if (err) return err;
  }
}
