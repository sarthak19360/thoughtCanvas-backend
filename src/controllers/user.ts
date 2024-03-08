import impUsers, { User } from "../utils/users";
const jwt = require("jsonwebtoken");
const zod = require("zod");
const secret = "top-semcret";

let users: User[] = impUsers;

const userInputSchema = zod.object({
  userId: zod.number(),
  userName: zod.string(),
  password: zod.string(),
});

const undefinedSchema = zod.undefined();

// login
const userLogin = (req: any, res: any) => {
  const userName: string = req.body.userName;
  const password: string = req.body.password;

  // input validation
  if (
    !zod.string().safeParse(userName).success ||
    !zod.string().safeParse(password).success
  ) {
    return res.status(403).json("Wrong input type");
  }

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

  const newUser: User | undefined = {
    userId: 3,
    userName,
    password,
  };
  // checking user input type
  if (!userInputSchema.safeParse(newUser).success) {
    return res.status(401).json({
      msg: "Wrong input type",
    });
  }
  users.push(newUser);
  return res.status(201).json({
    msg: "Success",
  });
};

// get user info
const getUserInfo = (req: any, res: any) => {
  const userId: number = Number(req.params.userId);

  // checking user input type
  if (!zod.number().safeParse(userId).success) {
    return res.status(401).json("Wrong input type");
  }

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

  // checking user input type
  if (!zod.number().safeParse(userId).success) {
    return res.status(401).json({
      msg: "Wrong input type",
    });
  }

  if (currUser) {
    const newUserInfo: User = {
      userId,
      userName,
      password,
    };
    // checking user input type
    if (!userInputSchema.safeParse(newUserInfo).success) {
      return res.status(401).json({
        msg: "Wrong input type",
      });
    }
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
