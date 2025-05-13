const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export default async function callApi(path, { method = "GET", body, requireAuth = true } = {}) {
  const headers = {};
  if (requireAuth) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (body != null) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, { method, headers, body });
  } catch (networkErr) {
    throw new Error(`Network error! Please check your internet`);
  }

  const json = await res.json().catch(() => ({}));

  if (res.status === 401) {
    logout();
    throw new Error(json.error?.message || "Unauthorized access!");
  }

  if (!res.ok) {
    throw new Error(json.error?.message || `API error ${res.status}`);
  }

  return json;
}

function logout() {
  ["token", "tokenType", "tokenExpiry", "user", "isLoggedIn", "adminEmail"].forEach((k) =>
    localStorage.removeItem(k)
  );
  window.location.href = "/login";
}
