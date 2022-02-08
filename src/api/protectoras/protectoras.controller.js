const Protectora = require("./protectoras.model");
const bcrypt = require("bcrypt");
const { setError } = require("../../utils/error/error");
const { generateSign } = require("../../utils/jwt/jwt");
const { deleteFile } = require("../../middlewares/deleteFile");

const postNewProtectora = async (req, res, next) => {
  try {
    const newProtectora = new Protectora(req.body);
    const protectoraDuplicate = await Protectora.findOne({ email: newProtectora.email });
    console.log("hola");
    console.log(req.file);
    if (req.file) {
      newProtectora.logo = req.file.path;
    }
    if (protectoraDuplicate) {
      return next(setError(404, "Email existente"));
    }
    const protectoraDB = await newProtectora.save();
    return res.status(201).json(protectoraDB);
  } catch (error) {
    return next(error);
  }
};

const loginProtectora = async (req, res, next) => {
  try {
    const protectoraDB = await Protectora.findOne({ email: req.body.email });
    if (!protectoraDB) {
      return next(setError(404, "Protectora not found"));
    }
    if (bcrypt.compareSync(req.body.password, protectoraDB.password)) {
      const token = generateSign(protectoraDB._id, protectoraDB.email);
      return res.status(200).json(token);
    }
  } catch (error) {
    error.message = "error Login";
    return next(error);
  }
};

const logoutProtectora = (req, res, next) => {
  try {
    const token = null;
    return res.status(200).json(token);
  } catch (error) {
    return next(error);
  }
};

const patchProtectora = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchProtectora = new Protectora(req.body);
    patchProtectora._id = id;
    const ProtectoraDB = await Protectora.findByIdAndUpdate(id, patchProtectora);
    if (ProtectoraDB.photo) {
      deleteFile(ProtectoraDB.photo);
    }
    if (req.file) {
      patchProtectora.photo = req.file.path;
    }
    if (!ProtectoraDB) {
      return next(setError(404, "Protectora not found"));
    }
    return res.status(200).json({ new: patchProtectora, old: ProtectoraDB });
  } catch (error) {
    return next(setError(500, "Protectora cant be replaced"));
  }
};

const getProtectora = async (req, res, next) => {
  try {
    const { id } = req.params;
    const protectoraDB = await Protectora.findById(id);
    if (!protectoraDB) {
      return next(setError(404, "Protectora not found"));
    }
    return res.status(200).json(protectoraDB);
  } catch (error) {
    return next(setError(404, "Protectora server fail"));
  }
};

const deleteProtectora = async (req, res, next) => {
  try {
    const { id } = req.params;
    const protectoraDB = await Protectora.findOneAndDelete({ id: id });

    if (!protectoraDB) {
      return next(setError(404, "Error deleting protectora"));
    }
    if (protectoraDB.img) {
      deleteFile(protectoraDB.img);
    }
    return res.status(200).json(protectoraDB);
  } catch (error) {
    return next(setError(500, "Protectora cant be removed"));
  }
};

module.exports = {
  postNewProtectora,
  loginProtectora,
  logoutProtectora,
  patchProtectora,
  getProtectora,
  deleteProtectora,
};
