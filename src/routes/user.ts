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
  .get("/user/followers/:userId", getFollowerList)
  .put("/user/update/:userId", userMiddleWare, updateUserInfo)
  .post("/user/login", userLogin)
  .post("/user/logout", invalidateToken, logoutHandler)
  .post("/user/signup", userSignUp)
  .put("/user/follow", userMiddleWare, followUser)
  .put("/user/unfollow/:unfollowUserId", userMiddleWare, unfollowUser);

export default router;
