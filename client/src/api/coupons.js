import apiClient from './axios';

export const validateCoupon = (code) =>
  apiClient.post('/coupons/validate', { code }).then((r) => r.data);
