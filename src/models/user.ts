const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: { type: String, req: true },
  password: { type: String, req: true },
  followers: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: String,
      followedAt: { type: Date, default: Date.now },
    },
  ],
  following: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: String,
      followedAt: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
