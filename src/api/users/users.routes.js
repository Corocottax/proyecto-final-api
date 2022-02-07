const UserRoutes = require('express').Router();
const uploadProfile = require("../../middlewares/filesProfile")
const { postNewUser, loginUser, logoutUser, getUser, patchUser, deleteUser } = require('./users.controller');
const {isUser}= require("../../middlewares/auth")

UserRoutes.post('/', uploadProfile.single('photo'), postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', [isUser], logoutUser)
UserRoutes.get('/:id', getUser)
UserRoutes.patch('/profile/:id',[isUser] , uploadProfile.single('photo'), patchUser)
UserRoutes.delete('/:id', [isUser], deleteUser)


module.exports = UserRoutes