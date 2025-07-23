// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Usuarios existentes...
export const registerUser = (userData) => apiClient.post('/users/register', userData);
export const loginUser = (credentials) => apiClient.post('/users/login', credentials);

// **Nuevas funciones para niños**
export const getChildren = (userId) =>
  apiClient.get(`/children/user/${userId}`);

export const createChild = (childData) =>
  apiClient.post('/children', childData);

export const deleteChild = (childId) =>
  apiClient.delete(`/children/${childId}`);

export const updateChild = (childId, updateData) =>
  apiClient.put(`/children/${childId}`, updateData);

export const generateActivity = (data) =>
  apiClient.post('/activities/generate', data);

export const getActivitiesByChild = (childId) =>
  apiClient.get(`/activities/child/${childId}`);

export const deleteActivity = (activityId) =>
  apiClient.delete(`/activities/${activityId}`);
