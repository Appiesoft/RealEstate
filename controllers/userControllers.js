const userModel = require("../models/user");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTE API";

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrpyt.hash(password, 10);
    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong" });
  }
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // agar woh email data base mein nahi hai
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "user not  found" });
    }
    // now we match credentions
    // existingUser.password means hashpassword
    //password this normal password
 
    const matchPassword = await bcrpyt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong" });
  }
};

module.exports = { signup, signin };
