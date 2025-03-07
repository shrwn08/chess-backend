const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials" });

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_ACCESS_TOKEN
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_REFRESH_TOKEN
    );

    res.json({ message: "Login Successfully ", accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser)
      return res.status(400).json({ message: "username already exists" });

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

const updateUserRating = async (req, res) => {
  try {
    const { userId } = req.params;
    const { rating } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { rating },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json(user);
  }
};

const updateUserTimeSetting = async (req, res) => {
  try {
    const { userId } = req.params;

    const { timeEnabled } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { timeEnabled },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error updating user time setting" });
  }
};

const refreshToken = (req, res) => {
    const {token} = req.body;

    if(!token) return res.status(401).json({message : "No refresh token provided"});

    jwt.verify(token, process.env.SECRET_REFRESH_TOKEN, (err, user)=>{
        if(err) return res.status(403).json({message : "invalid refresh token"});

        const newAccessToken = jwt.sign({userId: user.userId}, process.env.SECRET_ACCESS_TOKEN, {expiresIn : process.env.EXPIRE_ACCESS_TOKEN});
        res.json({accessToken : newAccessToken});
    });


};
module.exports = {
  userLogin,
  createUser,
  updateUserRating,
  updateUserTimeSetting,
  getUserById,
  refreshToken,
};
