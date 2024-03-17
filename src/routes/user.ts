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
  .get("/user/:userId", getUserInfo)
  .put("/user/:userId", userMiddleWare, updateUserInfo)
  .post("/user/login", userLogin)
  .post("/user/signup", userSignUp);

export default router;
