import axios from 'axios';
import storage from "../lib/storage";

const token = storage.get('token')
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.headers.common['Authorization'] = `Token ${token}`;


// POST /api/v1/seminar/
export const createSeminar = seminar => {
  return axios
    .post('/api/v1/seminar/', seminar)
}

// PUT /api/v1/seminar/{seminar_id}/
export const updateSeminar = (seminarId, updateData) => {
  return axios
    .put(`/api/v1/seminar/${seminarId}/`, updateData)
}

// GET /api/v1/seminar/{seminar_id}/
export const getSeminar = seminarId => {
  return axios
    .get(`/api/v1/seminar/${seminarId}/`)
}

// GET /api/v1/seminar/
export const getSeminars = (name, order) => {
  const params = {}
  if (name) params['name'] = name;
  if (order) params['order'] = order;
  return axios
    .get('/api/v1/seminar/', {params: params})
}

// POST /api/v1/seminar/{seminar_id}/user/
export const participateInSeminar = (seminarId, role) => {
  return axios
    .post(`/api/v1/seminar/${seminarId}/user/`, {role: role})
}

// DELETE /api/v1/seminar/{seminar_id}/user/
export const dropOutOfSeminar = seminarId => {
  return axios
    .delete(`/api/v1/seminar/${seminarId}/user/`)
}

