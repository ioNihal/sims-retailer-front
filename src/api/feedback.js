// src/api/feedback.js
import callApi from "./_callApi";
import { getCustomerId } from "./_auth";

/**
 * Send feedback (or report) on behalf of the current customer.
 * @param {string} message — the feedback text
 * @returns {Promise<void>}
 */
export async function sendFeedback(message) {
  const customerId = getCustomerId();
  if (!customerId) throw new Error("No user ID found");

  await callApi("/api/feedback", {
    method: "POST",
    body: {
      customerId,
      senderType: "customer",
      message: message.trim(),
    },
  });
}
