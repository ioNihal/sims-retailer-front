// safe read of customer‑ID
export function getCustomerId() {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      return typeof u.id === "string" ? u.id : null;
    } catch {
      return null;
    }
  }
  