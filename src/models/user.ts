const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: { type: String, req: true },
  password: { type: String, req: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
