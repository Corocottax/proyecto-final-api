const UserRoutes = require('express').Router();
const { postNewUser, loginUser, logoutUser, getUser, patchUser, deleteUser } = require('./users.controller');

UserRoutes.post('/', postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', logoutUser)
UserRoutes.post('/:id', getUser)
UserRoutes.post('/profile', patchUser)
UserRoutes.post('/:id', deleteUser)


module.exports = UserRoutes