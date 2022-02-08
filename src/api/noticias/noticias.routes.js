const NewsRoutes = require('express').Router();
const upload = require("../../middlewares/file")
const { postNewNew, getAllNew, deleteNew} = require('./noticias.controller');
const {isUser, isAdmin}= require("../../middlewares/auth")

NewsRoutes.post('/',[isAdmin], upload.single('img'), postNewNew)
NewsRoutes.get('/', getAllNew)
NewsRoutes.delete('/:id', [isAdmin], deleteNew)


module.exports = NewsRoutes