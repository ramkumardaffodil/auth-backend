import validator from "validator";
import Application from "../../models/Application.js";
import { getErrorMessge } from "../../utils/index.js";

class applicationController {
  createApllication = async (req, res) => {
    if (req.isAuth) {
      const {
        userId,
        firstName,
        lastName,
        gender,
        country,
        interests,
        phoneNumber,
        termAndCondition,
        favouriteLanguage,
        fatherName,
        motherName,
        imageUrl,
      } = req.body;
      if (!userId) {
        return res.status(403).json({ error: "Not authorized" });
      }
      const data = [
        { name: "firstName", value: firstName },
        { name: "lastName:", value: lastName },
        { name: "gender", value: gender },
        { name: "country", value: country },
        { name: "phoneNumber", value: phoneNumber },
        { name: "termAndCondition", value: termAndCondition },
        { name: "favouriteLanguage", value: favouriteLanguage },
        { name: "fatherName", value: fatherName },
        { name: "motherName", value: motherName },
      ];

      const emptyFields = data.filter((field) => !field.value);
      if (emptyFields[0]?.name) {
        return res
          .status(400)
          .json({ error: `${emptyFields[0].name} is a required field` });
      }

      if (!interests || interests.length === 0)
        return res.status(400).json({ error: `Interests is a required field` });
      if (!favouriteLanguage || favouriteLanguage.length === 0)
        return res
          .status(400)
          .json({ error: `Favourite players is a required field` });
      if (!validator.isMobilePhone(phoneNumber, ["en-IN"])) {
        return res.status(400).json({ error: "Invalid mobile number" });
      }
      try {
        const applicationData = {
          userId,
          firstName,
          lastName,
          gender,
          country,
          interests,
          phoneNumber,
          termAndCondition,
          favouriteLanguage,
          imageUrl,
          fatherName,
          motherName,
        };
        const application = await Application.create({
          ...applicationData,
        });
        if (application)
          return res
            .status(200)
            .json({ data: "application created successfully", application });
      } catch (error) {
        if (error?.errors?.userId?.kind?.includes("ObjectId")) {
          return res.status(403).json({ error: "Not authorized" });
        }
        return res.status(400).json({ error });
      }
    }
    return res.status(403).json({ error: "Not authorized" });
  };

  getAllApplication = async (req, res) => {
    if (req.isAuth) {
      const { userId } = req.body;
      if (!userId) return res.status(403).json({ error: "Not authorized" });
      try {
        let allApplication = await Application.find({ userId });
        allApplication = allApplication.map((el) => {
          el["__v"] = undefined;
          el["userId"] = undefined;
          return el;
        });
        return res.status(200).json({ data: allApplication });
      } catch (error) {
        if (error.kind.includes("ObjectId")) {
          return res.status(403).json({ error: "Not authorized" });
        }
        return res.status(400).json(error);
      }
    }
    return res.status(403).json({ error: "Not authorized" });
  };
  updateApplication = async (req, res) => {
    if (req.isAuth) {
      const {
        _id: id,
        firstName,
        lastName,
        fatherName,
        motherName,
        gender,
        country,
        interests,
        phoneNumber,
        termAndCondition,
        favouriteLanguage,
        imageUrl,
      } = req.body;
      if (!id) return res.status(400).json({ error: "Not authorized" });
      const data = [
        { name: "firstName", value: firstName },
        { name: "lastName:", value: lastName },
        { name: "gender", value: gender },
        { name: "country", value: country },
        { name: "phoneNumber", value: phoneNumber },
        { name: "termAndCondition", value: termAndCondition },
        { name: "favouriteLanguage", value: favouriteLanguage },
        { name: "fatherName", value: fatherName },
        { name: "motherName", value: motherName },
      ];
      const emptyFields = data.filter((field) => !field.value);
      if (emptyFields[0]?.name) {
        return res
          .status(400)
          .json({ error: `${emptyFields[0].name} is a required field` });
      }

      if (!interests || interests.length === 0)
        return res.status(400).json({ error: `Interests is a required field` });
      if (!favouriteLanguage || favouriteLanguage.length === 0)
        return res
          .status(400)
          .json({ error: `Favourite players is a required field` });
      if (!validator.isMobilePhone(phoneNumber, ["en-IN"])) {
        return res.status(400).json({ error: "Invalid mobile number" });
      }
      try {
        const data = {
          firstName,
          lastName,
          gender,
          country,
          interests,
          phoneNumber,
          termAndCondition,
          favouriteLanguage,
          fatherName,
          motherName,
        };
        const application = await Application.findByIdAndUpdate(id, data);
        return res
          .status(200)
          .json({ msg: "Application updated successfully!", application });
      } catch (error) {
        return res.status(400).json({ error: getErrorMessge(error) });
      }
    } else {
      return res.status(403).json({ error: "Not authorized" });
    }
  };
  deleteApplication = async (req, res) => {
    if (req.isAuth) {
      const { _id: id } = req.body;
      if (!id) {
        return res.status(403).json({ error: "Not authorized" });
      }
      try {
        const application = await Application.findByIdAndDelete(id);
        if (!application) {
          return res
            .status(200)
            .json({ message: "Application already deleted" });
        }
        return res
          .status(200)
          .json({ message: "Application deleted successfully" });
      } catch (error) {
        return res.status(400).json({ error: getErrorMessge(error) });
      }
    } else {
      return res.status(403).json({ error: "Not authorized" });
    }
  };
}

export default applicationController;
