import axios from 'axios';
import storage from "../lib/storage";

const AUTH_TOKEN = 'token'
const token = storage.get(AUTH_TOKEN)
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.headers.common['Authorization'] = `Token ${token}`;

// POST /api/v1/user/
export const signup = userInfo => {
  delete axios.defaults.headers.common['Authorization']
  return axios.post('/api/v1/user/', userInfo)
}

// PUT /api/v1/user/login/
export const login = (userInfo) => {
  delete axios.defaults.headers.common['Authorization']
  return axios
    .put('/api/v1/user/login/', userInfo)
}

// PUT /api/v1/user/me/
export const updateMyProfile = (userData) => {
  return axios
    .put('/api/v1/user/me/',userData)
}

// GET /api/v1/user/me/
// GET /api/v1/user/{user_id}/
export const getUserProfile = (userId) => {
  return axios
    .get(`/api/v1/user/${userId}/`)
}

// POST /api/v1/user/participant/
export const createParticipantProfile = () => {
  return axios
    .post(`/api/v1/user/participant/`)
}

