import authController from "../controllers/auth/index.js";
import applicationController from "../controllers/application/index.js";
import { Router } from "express";
import isAuth from "../middleware/is-auth.js";

const auth = new authController();
const application = new applicationController();
const router = new Router();

router.post("/sign-in", auth.signIn);
router.post("/sign-up", auth.signUp);
router.post("/refresh-token", auth.getAccessToken);
router.post("/create-application", application.createApllication);
router.post("/applications", application.getAllApplication);
router.get("/about", isAuth, auth.about);

export default router;
