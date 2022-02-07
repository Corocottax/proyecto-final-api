const User = require("./users.model");
const bcrypt = require("bcrypt");
const { setError } = require("../../utils/error/error");
const { generateSign } = require("../../utils/jwt/jwt");
const deleteFile = require("../../middlewares/deleteFile");

const postNewUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    newGame.name = req.body.name;
    newGame.type = req.body.type;
    newGame.year = req.body.year;
    newGame.characters = req.body.characters;
    newGame.platform = req.body.platform;
    const userDuplicate = await User.findOne({ email: newUser.email });
    if (userDuplicate) {
      return next(setError(404, "Email existente"));
    }
    if (req.file) {
      newUser.photo = req.file.path;
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
      return res.status(200).json(token);
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
    if (req.file) {
      patchUsers.img = req.file.path;
    }

    if (!UserDB) {
      return next(setError(404, "User not found"));
    }
    if (userDB.photo) {
      deleteFile(userDB.photo);
    }
    return res.status(200).json({ new: patchUser, old: UserDB });
  } catch (error) {
    return next(setError(500, "User cant be replaced :chipmunk:"));
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findById(id);
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
    const userDB = await Pc.findOneAndDelete({ id: id });

    if (id != req.params.id) {
      return next(setError(403, "Forbidden"));
    }
    /*  if (!userDB) {
      return next(setError(404, "Error deleting user"));
    } */
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
