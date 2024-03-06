import { Router } from "express";
import userMiddleWare from "../middlewares/userMiddleWare";
const router = Router();

const {
  userLogin,
  userSignUp,
  getUserInfo,
  updateUserInfo,
} = require("../controllers/user");

router
  .get("/:id", getUserInfo)
  .put("/:id", updateUserInfo)
  .post("/", userMiddleWare, userLogin)
  .post("/", userMiddleWare, userSignUp);

export default router;
