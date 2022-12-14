import mongoose, { model, Schema } from "mongoose";

const applicationSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  fatherName: { type: String, require: true },
  motherName: { type: String, require: true },
  gender: { type: Array, require: true },
  country: { type: Array, require: true },
  phoneNumber: { type: String, require: true },
  favouriteLanguage: { type: Array, require: true },
  termAndCondition: { type: Boolean, require: true },
  interests: { type: Array, require: true },
  imageUrl: { type: Buffer },
});

const Application = model("application", applicationSchema);
export default Application;
