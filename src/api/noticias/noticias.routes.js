const NewsRoutes = require('express').Router();
const upload = require("../../middlewares/file")
const { postNewNew, getAllNew, deleteNew, getNew} = require('./noticias.controller');
const {isUser, isAdmin}= require("../../middlewares/auth")

NewsRoutes.post('/', upload.single('img'), postNewNew)
NewsRoutes.get('/', [isUser], getAllNew)
NewsRoutes.get("/:id", [isUser], getNew)
NewsRoutes.delete('/:id', [isAdmin], deleteNew)
NewsRoutes.delete('/:id', deleteNew)


module.exports = NewsRoutes