import User from "../model/userModel.js";
import uploadOncloudinary  from "../config/cloudinary.js";
import validator from "validator";
import bcrypt from "bcrypt";
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    let photoUrl;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (req.file) {
      photoUrl = await uploadOncloudinary(req.file.path);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashPassword,
      photoUrl,
    });

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json(userResponse);
  } catch (error) {
    console.error("Sign up failed", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json(userResponse);
  } catch (error) {
    return res.status(500).json({ message: "signIn Error" });
  }
};

export const signOut = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "signOut successfully" });
  } catch (error) {
    return res.status(500).json({ message: "signOut Error" });
  }
};
