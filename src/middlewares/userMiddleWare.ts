import { User } from "../utils/users";
import users from "../utils/users";

const jwt = require("jsonwebtoken");
const secret = "top-semcret";

export default function userMiddleWare(req: any, res: any, next: Function) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ msg: "Missing auth header" });
  }
  const decoded: User | undefined = jwt.verify(authHeader, secret);
  if (decoded && decoded.userName) {
    req.userName = decoded.userName;
    next();
  } else {
    return res.status(403).json({ msg: "Incorrect token" });
  }
}
