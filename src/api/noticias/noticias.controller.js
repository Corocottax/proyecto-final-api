const New = require("./noticias.model");
const { setError } = require("../../utils/error/error");
const { deleteFile } = require("../../middlewares/deleteFile");

const postNewNew = async (req, res, next) => {
  try {
    const newNew = new New()
    newNew.nombre = req.body.nombre 
    if (req.file) {
      newNew.img = req.file.path;
    }
    newNew.title = req.body.title 
    newNew.description = req.body.description 


    const newDB = await newNew.save();
    return res.status(201).json(newDB);
  } catch (error) {
    return next(error);
  }
};

const getAllNew = async (req, res, next) => {
  try {
    const newDB = await New.find();
    return res.status(200).json(newDB);
  } catch (error) {
    return next(setError(404, "New server fail"));
  }
};

const getNew = async (req, res, next) => {
  try {
    const { id } = req.params;
    const NewDB = await New.findById(id);
    if (!NewDB) {
      return next(setError(404, "New not found"));
    }
    return res.status(200).json(NewDB);
  } catch (error) {
    return next(setError(404, "New server fail"));
  }
};

const deleteNew = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newDB = await New.findOneAndDelete({ id: id });

    if (!newDB) {
      return next(setError(404, "Error borrando new"));
    }
    if (newDB.img) {
      deleteFile(newDB.img);
    }
    return res.status(200).json(newDB);
  } catch (error) {
    return next(setError(500, "New no se puede borrar"));
  }
};

module.exports = {
  postNewNew,
  getAllNew,
  deleteNew,
  getNew
};