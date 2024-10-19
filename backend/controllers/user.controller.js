import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords does not match!" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        message:
          "Username has already existed! Please try a different username.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // profilePhoto
    const maleProfilePhoto = `https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-175774.jpg?username=${username}`;
    const femaleProfilePhoto = `https://img.freepik.com/free-vector/smiling-girl-with-freckles_1308-173252.jpg?username=${username}`;

    await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });

    return res.status(201).json({
      message: "Create new account successfully!",
      success: true,
    });
  } catch (error) {
    console.log("Error! Something went wrong about User Register!");
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ username });

    // Check whether user account existed in the Database
    if (!user) {
      return res.status(400).json({
        message: "Incorrect username or password!",
        success: false,
      });
    }

    // Compare password entered by user and hashed password of user account in database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect username or password!",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const secretKey = process.env.JWT_SECRET_KEY;

    const token = await jwt.sign(tokenData, secretKey, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.log("Error! Something went wrong about User Login!");
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({
        message: "Logged out successfully!",
      });
  } catch (error) {
    console.log("Error! Something went wrong with User Logout!");
    console.log(error);
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const loggedUserId = req.id;

    const otherUsers = await User.find({
      _id: { $ne: loggedUserId },
    }).select("-password");

    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log("Error! Something went wrong about getOtherUsers");
    console.log(error);
  }
};
