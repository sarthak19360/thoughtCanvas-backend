import { ObjectId } from "mongodb";

const jwt = require("jsonwebtoken");
const zod = require("zod");
const User = require("../models/user");
require("dotenv").config();
const secret = process.env.secret;

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
      password,
    },
    secret
  );

  return res.json({ token });
};

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

// get user info
const getUserInfo = async (req: any, res: any) => {
  const userId: ObjectId = req.params.userId;

  let currUser = await User.findById(userId);

  if (currUser) {
    const data = {
      id: currUser.userId,
      name: currUser.userName,
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
  const userId: ObjectId = req.params.userId;
  const userName: string = req.body.userName;
  const password: string = req.body.password;

  const currUser = await User.findById(userId);

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

export { userLogin, userSignUp, getUserInfo, updateUserInfo };
