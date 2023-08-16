const httpStatus = require("http-status");
const { ApiError } = require("../middlewares/apiError");
const { User } = require("../models/user");
const userService = require("./user.service");

const createUser = async (email, password) => {
  try {
    const emailTaken = await User.emailTaken(email);
    if (emailTaken) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Sorry email taken");
    }

    const user = new User({
      email,
      password,
    });

    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};

const generateAuthToken = async (user) => {
  const token = user.generateAuthToken();

  return token;
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.findUserByEmail(email);

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Sorry BAD email");
    }

    if (!(await user.comparePassword(password))) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Sorry BAD password");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  generateAuthToken,
  signInWithEmailAndPassword,
};
