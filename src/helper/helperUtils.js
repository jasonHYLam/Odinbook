export async function fetchData(endpoint, method, data) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`,
      {
        method: method,
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
