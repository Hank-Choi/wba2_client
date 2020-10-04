// POST /api/v1/user/
// PUT /api/v1/user/login/
// PUT /api/v1/user/me/
// GET /api/v1/user/{user_id}/
// GET /api/v1/user/me/
// POST /api/v1/user/participant/
// POST /api/v1/seminar/
// PUT /api/v1/seminar/{seminar_id}/
// GET /api/v1/seminar/{seminar_id}/
// GET /api/v1/seminar/
// POST /api/v1/seminar/{seminar_id}/user/
// DELETE /api/v1/seminar/{seminar_id}/user/

export {
  signup,
  login,
  updateMyProfile,
  getUserProfile,
  createParticipantProfile,
} from './userApi.js';

export {
  createSeminar,
  updateSeminar,
  getSeminar,
  getSeminars,
  participateInSeminar,
  dropOutOfSeminar,
} from './seminarApi.js';