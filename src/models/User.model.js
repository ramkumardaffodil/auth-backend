import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";
import { randomHash } from "../utils/index.js";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  this.refreshToken = randomHash();
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

userSchema.statics.getAccessToken = async function (refreshToken) {
  const user = await this.findOne({ refreshToken });
  if (user) {
    const updatedUser = await this.findOneAndUpdate(
      user._id,
      {
        refreshToken: randomHash(),
      },
      {
        new: true,
      }
    );
    if (updatedUser) {
      return updatedUser;
    }
    return Error("Unable to upate user with refresh token");
  }
  throw Error("Malware refresh token");
};

const User = model("user", userSchema);
export default User;
