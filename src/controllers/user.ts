import impUsers, { User } from "../utils/users";
const jwt = require("jsonwebtoken");
const secret = "top-semcret";

let users: User[] = impUsers;

// login
const userLogin = (req: any, res: any) => {
  const userName: string = req.body.userName;
  const password: string = req.body.password;
  const user: User | undefined = users.find((x) => x.userName === userName);

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
const userSignUp = (req: any, res: any) => {
  const userName: string = req.body.userName;
  const password: string = req.body.password;
  const userExists: User | undefined = users.find(
    (u) => u.userName === userName
  );
  if (userExists) {
    return res.status(409).json({
      msg: "Username already exists",
    });
  }
  users.push({
    userId: 3,
    userName,
    password,
  });
  return res.status(201).json({
    msg: "Success",
  });
};

// get user info
const getUserInfo = (req: any, res: any) => {
  const userId: number = Number(req.params.userId);
  let currUser: User | undefined = users.find((u) => u.userId === userId);

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
const updateUserInfo = (req: any, res: any) => {
  const userId: number = Number(req.params.userId);
  const userName: string = req.body.userName;
  const password: string = req.body.password;

  let currUser: User | undefined = users.find((u) => u.userId === userId);
  if (currUser) {
    const newUserInfo: User = {
      userId,
      userName,
      password,
    };
    currUser.userName = newUserInfo.userName;
    currUser.password = newUserInfo.password;
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
