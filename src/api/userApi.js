import axios from 'axios';
import storage from "../lib/storage";

const AUTH_TOKEN = 'token'
const token = storage.get(AUTH_TOKEN)
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.headers.common['Authorization'] = `Token ${token}`;

// POST /api/v1/user/
export const signup = user => {
  delete axios.defaults.headers.common['Authorization']
  return axios
    .post('/api/v1/user/', user)
}

// PUT /api/v1/user/login/
export const login = (user, autoLogin) => {
  delete axios.defaults.headers.common['Authorization']
  return axios
    .put('/api/v1/user/login/', user)
    .then((result) => {
      if (autoLogin) {
        storage.set('token', result.data.token);
      }
      axios.defaults.headers.common['Authorization'] = `Token ${result.data.token}`;
    })
}

// PUT /api/v1/user/me/
export const updateMyProfile = () => {
  return axios
    .put('/api/v1/user/me/')
}

// GET /api/v1/user/{user_id}/
export const getUserProfile = (userId) => {
  return axios
    .get(`/api/v1/user/${userId}/`)
}

// GET /api/v1/user/me/
export const getMyProfile = () => {
  return axios
    .get(`/api/v1/user/me/`)
}

// POST /api/v1/user/participant/
export const createParticipantProfile = (userId) => {
  return axios
    .get(`/api/v1/user/participant/`)
}

