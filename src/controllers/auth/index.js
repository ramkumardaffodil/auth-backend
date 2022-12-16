import validator from "validator";
import User from "../../models/User.js";
import { createToken } from "../../utils/token.js";

class authController {
  signUp = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !validator.isEmail(email))
      return res.json({ error: "Email is not valid" });
    if (!password || password.length < 6)
      return res.json({ error: "Password is not valid" });
    try {
      const user = await User.create({ email, password });
      const accessToken = createToken(
        user,
        process.env.ACCESS_SECRET_KEY,
        process.env.ACCESS_TOKEN_EXPIRES_TIME
      );
      return res.status(200).json({
        userId: user._id,
        accessToken,
        refreshToken: user.refreshToken,
      });
    } catch (error) {
      console.log("error while sign up is : ", error);
      if (error?.code === 11000) {
        return res.status(400).json({ error: "Email already present" });
      }
      return res.status(400).json(error);
    }
  };

  signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !validator.isEmail(email))
      return res.json({ error: "Email is not valid" });
    if (!password || password.length < 6)
      return res.json({ error: "Password is not valid" });
    try {
      const user = await User.login(email, password);
      const accessToken = createToken(
        user,
        process.env.ACCESS_SECRET_KEY,
        process.env.ACCESS_TOKEN_EXPIRES_TIME
      );
      return res.json({
        userId: user._id,
        accessToken,
        refreshToken: user.refreshToken,
      });
    } catch (error) {
      console.log("error while sign in is : ", error);
      return res.json({ error });
    }
  };

  getAccessToken = async (req, res) => {
    const { refreshToken } = req.body;
    try {
      const user = await User.getAccessToken(refreshToken);
      const accessToken = createToken(
        user,
        process.env.ACCESS_SECRET_KEY,
        process.env.ACCESS_TOKEN_EXPIRES_TIME
      );
      return res.json({
        userId: user._id,
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
  };

  about = (req, res) => {
    this.pong(req, res);
    res.json({ msg: "ping" });
  };

  pong = (req, res) => {
    console.log("pong");
  };
  getUserDetails = async (req, res) => {
    if (req.isAuth) {
      const { userId } = req.body;
      try {
        const user = await User.findById(userId);
        const accessToken = createToken(
          user,
          process.env.ACCESS_SECRET_KEY,
          process.env.ACCESS_TOKEN_EXPIRES_TIME
        );
        return res.status(200).json({
          userId: user._id,
          accessToken,
          refreshToken: user.refreshToken,
        });
      } catch (error) {
        return res.status(400).json(error);
      }
    } else {
      return res.status(403).json({ error: "Not authorized" });
    }
  };
}

export default authController;
