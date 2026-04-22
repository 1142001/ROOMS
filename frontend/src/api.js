import axios from "axios";

const API = " https://rooms-2-q0os.onrender.com/api";

// AUTH
export const registerUser = (data) => axios.post(`${API}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API}/auth/login`, data);

// ROOMS
export const getRooms = (fromDate, toDate) =>
  axios.get(`${API}/rooms`, {
    params: { fromDate, toDate }
  });

export const createRoom = (data, token) =>
  axios.post(`${API}/rooms`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteRoom = (id, token) =>
  axios.delete(`${API}/rooms/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// BOOKINGS
export const bookRoom = (data, token) =>
  axios.post(`${API}/bookings`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });