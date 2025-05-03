// src/api/feedback.js
const API_BASE = import.meta.env.VITE_API_BASE_URL;
/**
 * Send feedback (or report) on behalf of the current customer.
 * @param {string} message — the feedback text
 * @returns {Promise<void>}
 */
export async function sendFeedback(message) {
    const customerId = JSON.parse(localStorage.getItem("user")).id;
    if (!customerId) throw new Error("Not userID found");

    const res = await fetch(`${API_BASE}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            customerId,
            senderType: "customer",
            message: message.trim(),
        }),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.error?.message || "Failed to send feedback");
}
