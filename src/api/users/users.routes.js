const UserRoutes = require('express').Router();
const uploadProfile = require("../../middlewares/filesProfile")
const { postNewUser, loginUser, logoutUser, getUser, patchUser, deleteUser } = require('./users.controller');
const {isUser}= require("../../middlewares/auth")

UserRoutes.post('/', uploadProfile.single('photo'), postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', logoutUser)
UserRoutes.get('/:id', getUser)
UserRoutes.patch('/:id', uploadProfile.single('photo'), patchUser)
UserRoutes.delete('/:id', deleteUser)


module.exports = UserRoutes