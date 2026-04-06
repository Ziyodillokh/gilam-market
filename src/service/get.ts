import qs from "qs";
export async function fetchData(url: string, query?: Record<string, any>, token?: string) {
  try {
    // token ni query dan ajratib olish (eski kod token ni query ichida yuborardi)
    const cleanQuery = query ? { ...query } : {};
    const authToken = token || cleanQuery.token;
    delete cleanQuery.token;

    const params = Object.keys(cleanQuery).length
      ? `?${qs.stringify(cleanQuery, { arrayFormat: "repeat" })}`
      : "";

    const headers: Record<string, string> = {};
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const res = await fetch(`${url}${params}`, {
      method: "GET",
      cache: "no-cache",
      headers,
    });

    if (!res.ok) throw new Error(`Failed to fetch data from ${url}`);
    return res.json();
  } catch (error) {
    return null;
  }
}
