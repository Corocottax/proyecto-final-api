 const MascotasRoutes = require('express').Router();
const upload = require("../../middlewares/file")
const { postNewMascota, patchMascota, getMascota, getAllMascota, deleteMascota } = require('./mascotas.controller');
const {isProtectora, isUser}= require("../../middlewares/auth")

MascotasRoutes.post('/', upload.single('photo'), postNewMascota)
MascotasRoutes.get('/', getAllMascota)
MascotasRoutes.get('/:id', getMascota)
MascotasRoutes.patch('/:id', upload.single('photo'), patchMascota)
MascotasRoutes.delete('/:id', deleteMascota)


module.exports = MascotasRoutes