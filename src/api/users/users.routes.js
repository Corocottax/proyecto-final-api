const UserRoutes = require('express').Router();
const upload = require('../../middlewares/file');
const { postNewUser, loginUser, logoutUser, getUser, patchUser, deleteUser } = require('./users.controller');
const {isUser}= require("../../middlewares/auth")

UserRoutes.post('/', upload.single('photo'), postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', [isUser], logoutUser)
UserRoutes.get('/:id', getUser)
UserRoutes.patch('/profile', upload.single('photo'), patchUser)
UserRoutes.delete('/:id', deleteUser)


module.exports = UserRoutes