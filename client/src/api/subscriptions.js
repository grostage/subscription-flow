import apiClient from './axios';

export const subscribe = (payload) =>
  apiClient.post('/subscriptions/subscribe', payload).then((r) => r.data);
