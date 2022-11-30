import jwt from "jsonwebtoken";

export const createToken = (user, secretKey, expiresTime) => {
  return jwt.sign({ id: user._id }, secretKey, {
    expiresIn: expiresTime,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_SECRET_KEY);
};
