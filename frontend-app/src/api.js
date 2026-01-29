import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' });

export async function fetchEvents() {
  const res = await api.get('/events');
  return res.data.data;
}

export async function fetchEventsWithFilter({ category, q } = {}) {
  const params = {};
  if (category) params.category = category;
  if (q) params.q = q;
  const res = await api.get('/events', { params });
  return res.data.data;
}

export async function fetchEvent(id) {
  const res = await api.get(`/events/${id}`);
  return res.data.data;
}

export async function fetchCategories() {
  const res = await api.get('/events/categories/list');
  return res.data.data;
}

export async function createBooking(payload) {
  const res = await api.post('/bookings', payload);
  return res.data.data;
}

export async function fetchBooking(id) {
  const res = await api.get(`/bookings/${id}`);
  return res.data.data;
}

export async function cancelBooking(id) {
  const res = await api.post(`/bookings/${id}/cancel`);
  return res.data.data;
}

export default api;
