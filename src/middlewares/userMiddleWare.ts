import { User } from "../utils/users";
import users from "../utils/users";

export default function userMiddleWare(req: any, res: any, next: Function) {
  const userName: string = req.body.userName;
  const password: string = req.body.password;
  const user: User | undefined = users.find((u) => u.userName === userName);
  if (user) {
    if (user.password === password) {
      next();
      return;
    } else {
      return res.status(401).json({
        msg: "Wrong password",
      });
    }
  } else {
    return res.status(403).json({
      msg: "Wrong User input",
    });
  }
}
