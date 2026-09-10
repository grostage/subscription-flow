import apiClient from './axios';

export const getPlans = () => apiClient.get('/plans').then((r) => r.data.plans);
