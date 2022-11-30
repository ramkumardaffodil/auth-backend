import validator from "validator";
import User from "../../models/User.model.js";
import { createToken } from "../../utils/token.js";

class authController {
  async signUp(req, res) {
    const { email, password } = req.body;
    if (!email || !validator.isEmail(email))
      return res.json({ data: "Email is not valid" });
    if (!password || password.length < 6)
      return res.json({ data: "Password is not valid" });
    try {
      const user = await User.create({ email, password });
      const accessToken = createToken(
        user,
        process.env.ACCESS_SECRET_KEY,
        process.env.ACCESS_TOKEN_EXPIRES_TIME
      );
      return res
        .status(200)
        .json({ data: user._id, accessToken, refreshToken: user.refreshToken });
    } catch (error) {
      console.log("error while sign up is : ", error);
      return res.status(400).json(error);
    }
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    if (!email || !validator.isEmail(email))
      return res.json({ data: "Email is not valid" });
    if (!password || password.length < 6)
      return res.json({ data: "Password is not valid" });
    try {
      const user = await User.login(email, password);
      const accessToken = createToken(
        user,
        process.env.ACCESS_SECRET_KEY,
        process.env.ACCESS_TOKEN_EXPIRES_TIME
      );
      return res.json({
        data: user._id,
        accessToken,
        refreshToken: user.refreshToken,
      });
    } catch (error) {
      console.log("error while sign in is : ", error);
      return res.json({ error });
    }
  }

  async getAccessToken(req, res) {
    const { refreshToken } = req.body;
    try {
      const user = await User.getAccessToken(refreshToken);
      const accessToken = createToken(
        user,
        process.env.ACCESS_SECRET_KEY,
        process.env.ACCESS_TOKEN_EXPIRES_TIME
      );
      return res.json({
        data: user._id,
        accessToken,
        refreshToken: user.refreshToken,
      });
    } catch (error) {
      console.log(
        "error while getting access token using refresh token is ",
        error
      );
      return res.json(error);
    }
  }
  about(req, res) {
    res.json({ msg: "ping" });
  }
}

export default authController;
