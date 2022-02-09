const User = require("./users.model");
const bcrypt = require("bcrypt");
const { setError } = require("../../utils/error/error");
const { generateSign } = require("../../utils/jwt/jwt");
const { deleteFile } = require("../../middlewares/deleteFile");

const postNewUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userDuplicate = await User.findOne({ email: newUser.email });
    console.log("hola");
    console.log(req.file);
    if (req.file) {
      newUser.photo = req.file.path;
    }
    if (userDuplicate) {
      return next(setError(404, "Email existente"));
    }
    const userDB = await newUser.save();
    return res.status(201).json(userDB);
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const userDB = await User.findOne({ email: req.body.email });
    if (!userDB) {
      return next(setError(404, "User not found"));
    }
    if (bcrypt.compareSync(req.body.password, userDB.password)) {
      const token = generateSign(userDB._id, userDB.email);
      return res.status(200).json(token, userDB);
    }
  } catch (error) {
    error.message = "error Login";
    return next(error);
  }
};

const logoutUser = (req, res, next) => {
  try {
    const token = null;
    return res.status(200).json(token);
  } catch (error) {
    return next(error);
  }
};

const patchUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchUser = new User(req.body);
    patchUser._id = id;
    const UserDB = await User.findByIdAndUpdate(id, patchUser);
    if (UserDB.photo) {
      deleteFile(UserDB.photo);
    }
    if (req.file) {
      patchUser.photo = req.file.path;
    }
    if (!UserDB) {
      return next(setError(404, "User not found"));
    }
    return res.status(200).json({ new: patchUser, old: UserDB });
  } catch (error) {
    return next(setError(500, "User cant be replaced"));
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findById(id).populate("mascotas");
    if (!userDB) {
      return next(setError(404, "User not found"));
    }
    return res.status(200).json(userDB);
  } catch (error) {
    return next(setError(404, "User server fail"));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findOneAndDelete({ id: id });

    if (!userDB) {
      return next(setError(404, "Error deleting user"));
    }
    if (userDB.img) {
      deleteFile(userDB.img);
    }
    return res.status(200).json(userDB);
  } catch (error) {
    return next(setError(500, "User cant be removed"));
  }
};

module.exports = {
  postNewUser,
  loginUser,
  logoutUser,
  patchUser,
  getUser,
  deleteUser,
};
