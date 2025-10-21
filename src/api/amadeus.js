export async function searchFlights(params) {
  const token = ""; // ⚠️ временный токен

  const url = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.append(key, value);
  }
  url.searchParams.append("max", 50);
  url.searchParams.append("nonStop", false);

  const res = await fetch(url.toString(), {
    headers: {
      accept: "application/vnd.amadeus+json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка запроса: " + res.status);
  return res.json();
}
