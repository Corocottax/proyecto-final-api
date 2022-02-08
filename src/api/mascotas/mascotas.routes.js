 const MascotasRoutes = require('express').Router();
const upload = require("../../middlewares/file")
const { postNewMascota, patchMascota, getMascota, getAllMascota, deleteMascota } = require('./mascotas.controller');
const {isProtectora, isUser}= require("../../middlewares/auth")

MascotasRoutes.post('/',[isProtectora], upload.single('photo'), postNewMascota)
MascotasRoutes.get('/', getAllMascota)
MascotasRoutes.get('/:id', [isUser], getMascota)
MascotasRoutes.patch('/:id',[isProtectora], upload.single('photo'), patchMascota)
MascotasRoutes.delete('/:id', [isProtectora], deleteMascota)


module.exports = MascotasRoutes