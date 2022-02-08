const ProtectoraRoutes = require('express').Router();
const uploadProfile = require("../../middlewares/filesProfile")
const { postNewProtectora, loginProtectora, logoutProtectora, getProtectora, patchProtectora, deleteProtectora } = require('./protectoras.controller');
const {isProtectora}= require("../../middlewares/auth")

ProtectoraRoutes.post('/', uploadProfile.single('photo'), postNewProtectora)
ProtectoraRoutes.post('/login', loginProtectora)
ProtectoraRoutes.post('/logout', logoutProtectora)
ProtectoraRoutes.get('/:id', getProtectora)
ProtectoraRoutes.patch('/:id', uploadProfile.single('photo'), patchProtectora)
ProtectoraRoutes.delete('/:id', deleteProtectora)


module.exports = ProtectoraRoutes