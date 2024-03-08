import { Router } from "express";
const router = Router();

const {
  userLogin,
  userSignUp,
  getUserInfo,
  updateUserInfo,
} = require("../controllers/user");

router
  .get("/user/:userId", getUserInfo)
  .put("/user/:userId", updateUserInfo)
  .post("/user/login", userLogin)
  .post("/user/signup", userSignUp);

export default router;
