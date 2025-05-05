// api/user.js

import callApi from './_callApi';
import { getCustomerId } from './_auth';

export async function resetPassword(newPassword, confirmPassword, setState = () => {}) {
  if (newPassword !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  if (!newPassword) {
    throw new Error('Password cannot be empty');
  }

  const userId = getCustomerId();
  if (!userId) {
    throw new Error('User ID not found');
  }

  const base64Password = btoa(newPassword);

  return await callApi(`/api/customer/reset/${userId}`, {
    method: 'PATCH',
    body: { password: base64Password },
  });
}
