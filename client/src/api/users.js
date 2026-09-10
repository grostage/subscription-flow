import apiClient from './axios';

export const getUser = (username) =>
  apiClient.get(`/users/${encodeURIComponent(username)}`).then((r) => r.data);

export const createUser = (payload) =>
  apiClient.post('/users', payload).then((r) => r.data);
