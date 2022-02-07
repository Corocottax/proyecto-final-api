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

const isProtectora = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(setError(404, "Unauthorized"));
    }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken, process.env.JWT_SECRET);
    const userLogued = await User.findById(validToken.id);
    const user =  userLogued.toJSON()
    console.log(userLogued);
    if (user.rol === "protectora") {
      user.password = null;
      req.user = user;
      next();
    } else {
        return next(setError(404, "Unauthorized"));
    }
  } catch (error) {
    return next(error);
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(setError(404, "Unauthorized"));
    }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken, process.env.JWT_SECRET);
    const userLogued = await User.findById(validToken.id);
    const user =  userLogued.toJSON()
    console.log(userLogued);
    if (user.rol === "admin") {
      user.password = null;
      req.user = user;
      next();
    } else {
        return next(setError(404, "Unauthorized"));
    }
  } catch (error) {
    return next(error);
  }
};



module.exports = { isUser, isProtectora, isAdmin };
