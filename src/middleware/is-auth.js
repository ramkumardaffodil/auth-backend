import { verifyToken } from "../utils/token.js";

const isAuth = async (req, res, next) => {
  req.isAuth = false;
  if (!req.headers["authorization"])
    res.json({ error: "Auth header not present" });
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) res.json({ error: "Invalid token" });
  try {
    const isTokenValid = verifyToken(token);
    req.isAuth = true;
  } catch (error) {
    res.json({ error: "Malwared jwt" });
  }
  next();
};

export default isAuth;
