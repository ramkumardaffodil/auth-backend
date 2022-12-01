import validator from "validator";
import Application from "../../models/Application.js";

class applicationController {
  async createApllication(req, res) {
    if (req.isAuth) {
      const {
        userId,
        firstName,
        lastName,
        gender,
        country,
        interests,
        phoneNumber,
        acceptTermAndCondition,
        favouriteLanguage,
        imageUrl,
        salary,
        favouritePlayers,
      } = req.body;
      if (!userId) return res.status(403).json({ error: "Not authorized" });
      const data = [
        { name: "firstName", value: firstName },
        { name: "lastName:", value: lastName },
        { name: "gender", value: gender },
        { name: "country", value: country },
        { name: "phoneNumber", value: phoneNumber },
        { name: "acceptTermAndCondition", value: acceptTermAndCondition },
        { name: "favouriteLanguage", value: favouriteLanguage },
        { name: "salary", value: salary },
      ];
      data.map((el) => {
        if (!el.value)
          return res
            .status(400)
            .json({ error: `${el.name} is a required field` });
      });
      if (!interests || interests.length === 0)
        return res.status(400).json({ error: `Interests is a required field` });
      if (!favouritePlayers || favouritePlayers.length === 0)
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
          acceptTermAndCondition,
          favouriteLanguage,
          imageUrl,
          salary,
          favouritePlayers,
        };
        const application = await Application.create({
          ...applicationData,
        });
        if (application)
          return res
            .status(200)
            .json({ data: "application created successfully" });
      } catch (error) {
        console.log("error while saving application is ", error);
        if (error?.errors?.userId?.kind?.includes("ObjectId")) {
          return res.status(403).json({ error: "Not authorized" });
        }
        return res.status(400).json({ error });
      }
    }
    return res.status(403).json({ error: "Not authorized" });
  }

  async getAllApplication(req, res) {
    if (req.isAuth) {
      const { userId } = req.body;
      if (!userId) return res.status(403).json({ error: "Not authorized" });
      try {
        const allApplication = await Application.find({ userId });
        return res.status(200).json({ data: allApplication });
      } catch (error) {
        if (error.kind.includes("ObjectId")) {
          return res.status(403).json({ error: "Not authorized" });
        }
        console.log("Error while getting all application is", error);
        return res.status(400).json(error);
      }
    }
    return res.status(403).json({ error: "Not authorized" });
  }
}

export default applicationController;
