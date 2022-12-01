import mongoose, { model, Schema } from "mongoose";

const applicationSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  gender: { type: String, require: true },
  country: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  favouriteLanguage: { type: String, require: true },
  salary: { type: Number, require: true },
  acceptTermAndCondition: { type: Boolean, require: true },
  interests: { type: Array, require: true },
  favouritePlayers: { type: Array, require: true },
  imageUrl: { type: Buffer },
});

const Application = model("application", applicationSchema);
export default Application;
