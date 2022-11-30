import { verifyToken } from "../utils/token.js";

const isAuth = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) return res.json({ error: "Invalid token" });
  try {
    const isTokenValid = verifyToken(token);
    console.log("token after verify is ", isTokenValid);
  } catch (error) {
    console.log("error while verify token is ", error);
    return res.json({ error: "Malwared jwt" });
  }
  next();
};

export default isAuth;
