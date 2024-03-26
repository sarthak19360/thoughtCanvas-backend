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
  followUser,
  unfollowUser,
  getFollowerList,
} = require("../controllers/user");

router
  .get("/user/:userName", getUserInfo)
  .get("/user/followers/:userName", getFollowerList)
  .put("/user/update/:userId", userMiddleWare, updateUserInfo) // 1
  .post("/user/login", userLogin)
  .post("/user/logout", invalidateToken, logoutHandler) // 1
  .post("/user/signup", userSignUp)
  .put("/user/follow", userMiddleWare, followUser)
  .put("/user/unfollow", userMiddleWare, unfollowUser);

export default router;
