const { authService } = require("../services");
const httpStatus = require("http-status");

const authController = {
  async register(req, res, next) {
    try {
      const {
        body: { email, password },
      } = req;

      const user = await authService.createUser(email, password);
      const token = await authService.generateAuthToken(user);

      res
        .cookie("x-access-token", token)
        .status(httpStatus.CREATED)
        .send({ user, token });
    } catch (error) {
      next(error);
    }
  },
  async signin(req, res, next) {
    try {
      const {
        body: { email, password },
      } = req;
      const user = await authService.signInWithEmailAndPassword(
        email,
        password
      );

      const token = await authService.generateAuthToken(user);

      res
        .cookie("x-access-token", token)
        .status(httpStatus.CREATED)
        .send({ user, token });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
