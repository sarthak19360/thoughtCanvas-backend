import { ObjectId } from "mongodb";
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const zod = require("zod");
const User = require("../models/user");
require("dotenv").config();
const secret = process.env.secret;

// signup
const userSignUp = async (req: any, res: any) => {
  const userName: string = req.body.userName;
  const password: string = req.body.password;

  // input validation
  if (
    !zod.string().safeParse(userName).success ||
    !zod.string().safeParse(password).success
  ) {
    return res.status(403).json("Wrong input type");
  }

  const userExists = await User.findOne({ userName });

  if (userExists) {
    return res.status(409).json({
      msg: "Username already exists",
    });
  }

  const newUser = new User({
    userName,
    password,
  });

  await newUser.save();
  return res.status(201).json({
    msg: "Success",
  });
};

// login
const userLogin = async (req: any, res: any) => {
  const userName: string = req.body.userName;
  const password: string = req.body.password;

  // input validation
  if (
    !zod.string().safeParse(userName).success ||
    !zod.string().safeParse(password).success
  ) {
    return res.status(403).json("Wrong input type");
  }

  const user = await User.findOne({ userName });

  if (!user) {
    return res.status(403).json({ msg: "User not found" });
  }

  if (user.password !== password) {
    return res.status(403).json({ msg: "Incorrect password" });
  }

  const token = jwt.sign(
    {
      userName,
    },
    secret,
    {
      expiresIn: "1h",
    }
  );

  return res.json({ token });
};

// logout
const logoutHandler = (req: any, res: any): void => {
  res.status(200).json({ message: "Logout successful", token: req.token });
};

// get user info
const getUserInfo = async (req: any, res: any) => {
  const userName: String = req.params.userName;

  let currUser = await User.find({ userName });

  if (currUser) {
    const data = {
      name: currUser[0].userName,
      followers: currUser[0].followers,
      following: currUser[0].following,
    };
    return res.status(200).json({
      data,
    });
  } else {
    return res.status(401).json({
      msg: "User doesn't exist",
    });
  }
};

// update user info
const updateUserInfo = async (req: any, res: any) => {
  const user = await User.find({ userName: req.userName });

  const userName: string = req.body.userName;
  const password: string = req.body.password;

  // Ensure that the user is updating their own information
  if (req.params.userId !== user[0]._id.toHexString()) {
    return res.status(403).json({
      msg: "You are not authorized to update this user's information",
    });
  }

  const currUser = await User.findById(user[0]._id.toHexString());

  if (currUser) {
    currUser.userName = userName;
    currUser.password = password;
    await currUser.save();
    return res.status(200).json({
      msg: "UserInfo updated",
    });
  } else {
    return res.status(401).json({
      msg: "Invalid userId",
    });
  }
};

// follow a user
const followUser = async (req: any, res: any) => {
  try {
    // Find the user by userName
    const user = await User.findOne({ userName: req.userName });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Get the userId and followUserName
    const userId = user._id;
    const followUserId = req.params.followUserId;
    const followUser = await User.findById(followUserId);

    if (!followUser) {
      return res
        .status(404)
        .json({ success: false, message: "Follow user not found" });
    }

    if (userId.toString() === followUserId) {
      return res.status(402).json({
        msg: "Can't follow yourself",
      });
    }

    // Check if the user is already following the target user
    if (
      user.following.some(
        (follow: any) => follow.userId.toString() === followUserId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "User is already following the target user",
      });
    }

    const followUserName = followUser.userName;

    // Update the follower's following list
    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        following: { userId: followUserId, username: followUserName },
      },
    });

    // Update the followed user's followers list
    await User.findByIdAndUpdate(followUserId, {
      $addToSet: { followers: { userId, username: user.userName } },
    });

    // Return success message
    return res
      .status(201)
      .json({ success: true, message: "User followed successfully" });
  } catch (error) {
    console.error("Error following user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error following user" });
  }
};

// unfollow a user
const unfollowUser = async (req: any, res: any) => {
  try {
    // Find the user by userName
    const user = await User.findOne({ userName: req.userName });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Get the userId and unfollowUserId
    const userId = user._id;
    const unfollowUserId = req.params.unfollowUserId;

    // Check if the user is trying to unfollow themselves
    if (userId.toString() === unfollowUserId) {
      return res
        .status(400)
        .json({ success: false, message: "User cannot unfollow themselves" });
    }

    // Check if the user is not following the target user
    if (
      !user.following.some(
        (follow: any) => follow.userId.toString() === unfollowUserId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "User is not following the target user",
      });
    }

    // Find the unfollow user by ID
    const unfollowUser = await User.findById(unfollowUserId);

    if (!unfollowUser) {
      return res
        .status(404)
        .json({ success: false, message: "Unfollow user not found" });
    }

    // Update the follower's following list
    await User.findByIdAndUpdate(userId, {
      $pull: { following: { userId: unfollowUserId } },
    });

    // Update the unfollowed user's followers list
    await User.findByIdAndUpdate(unfollowUserId, {
      $pull: { followers: { userId } },
    });

    // Return success message
    return res
      .status(200)
      .json({ success: true, message: "User unfollowed successfully" });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error unfollowing user" });
  }
};

// get all followers for a user
const getFollowerList = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const { followers } = await User.findById(userId);
    const usernames = followers.map((f: any) => f.username);
    res.status(201).json({ data: usernames });
  } catch (error) {
    console.error("Error fetching followers: ", error);
    return res
      .status(403)
      .json({ success: false, message: "Error fetching followers" });
  }
};

export {
  userLogin,
  userSignUp,
  getUserInfo,
  updateUserInfo,
  logoutHandler,
  followUser,
  unfollowUser,
  getFollowerList,
};
