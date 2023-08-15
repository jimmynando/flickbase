const { authService } = require("../services");

const authController = {
  async register(req, res, next) {
    try {
      const {
        body: { email, password },
      } = req;

      const user = await authService.createUser(email, password);

      res.json(user);
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = authController;
