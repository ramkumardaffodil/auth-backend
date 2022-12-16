import { Router } from "express";
import authController from "../controllers/auth/index.js";
import applicationController from "../controllers/application/index.js";
import isAuth from "../middleware/is-auth.js";

const auth = new authController();
const application = new applicationController();
const router = Router();

router.post("/sign-in", auth.signIn);
router.post("/sign-up", auth.signUp);

router.post("/refresh-token", auth.getAccessToken);

router.post("/user-details", isAuth, auth.getUserDetails);

router.post("/create-application", isAuth, application.createApllication);
router.post("/applications", isAuth, application.getAllApplication);

router.post("/update-application", isAuth, application.updateApplication);
router.post("/remove-application", isAuth, application.deleteApplication);

router.get("/about", auth.about);

export default router;
