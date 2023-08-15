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

      res.json(user);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  },
};

module.exports = authController;
