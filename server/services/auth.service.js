const { User } = require("../models/user");

const createUser = async (email, password) => {
  try {
    const emailTaken = await User.emailTaken(email);
    if (emailTaken) {
      throw new Error("Sorry, email taken");
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

module.exports = {
  createUser,
  generateAuthToken,
};
