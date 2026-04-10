import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const loginUser = async (userName, password) => {
  const response = await api.post('/users/login', { userName, password });
  return response.data;
};

export const signupUser = async (userName, password) => {
  const response = await api.post('/users/signup', { userName, password });
  return response.data;
};

export const fetchDashboardUsers = async (userId) => {
  const response = await api.get(`/users/dashboard/${userId}`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await api.post('/users', user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export default api;
