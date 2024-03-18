import { Router } from "express";
import userMiddleWare from "../middlewares/userMiddleWare";
import invalidateToken from "../middlewares/invalidateToken";
const router = Router();

const {
  userLogin,
  userSignUp,
  getUserInfo,
  updateUserInfo,
  logoutHandler,
} = require("../controllers/user");

router
  .get("/user/:userId", getUserInfo)
  .put("/user/:userId", userMiddleWare, updateUserInfo)
  .post("/user/login", userLogin)
  .post("/user/logout", invalidateToken, logoutHandler)
  .post("/user/signup", userSignUp);

export default router;
