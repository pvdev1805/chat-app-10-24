import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
    console.log("Error! Something went wrong about User!");
    console.log(error);
  }
};
