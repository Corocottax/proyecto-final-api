const User = require("../api/users/users.model");
const { setError } = require("../utils/error/error");
const { verifyJwt } = require("../utils/jwt/jwt");

const isUser = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(setError(404, "Unauthorized"));
    }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken, process.env.JWT_SECRET);
    const userLogued = User.findById(validToken.id);

    userLogued.password = null;
    req.user = userLogued;
    next();
  } catch (error) {
    return next(error);
  }
};
const isProtectora = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(setError(404, "Unauthorized"));
    }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken, process.env.JWT_SECRET);
    const userLogued = User.findById(validToken.id);
    if (userLogued.rol === "protectora") {
      userLogued.password = null;
      req.user = userLogued;
      next();
    } else {
      return next("No es autorizado" + error);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { isUser, isProtectora };
