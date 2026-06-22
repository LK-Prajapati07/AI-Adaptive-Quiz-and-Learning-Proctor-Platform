import admin from "../config/firebase.admin.js";
import { Auth } from "../model/auth.model.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
export const createUser = async (req, res) => {
  try {
    const { idToken,role} = req.body;
    const allowedRoles = ["User", "Trainer", "Recruiter"];
    console.log(idToken)
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Invalid role",
      });
    }
    if (!idToken) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, email_verified, firebase } = decodedToken;
    if (!uid || !email || !firebase) {
      return res.status(400).json({
        success: false,
        message: "Invalid token data",
      });
    }

    if (!email_verified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email",
      });
    }
    const name = decodedToken.name || "";
    const provider = firebase?.sign_in_provider; // it provide which type user login password login or google login
    const expiresIn = 7 * 24 * 60 * 60 * 1000;
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("session", sessionCookie, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: expiresIn,
    });
    let user = await Auth.findOne({ uid });

    let profilePhoto = "";

    if (!user) {
      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, "profile");

        profilePhoto = result.secure_url;
      }

      user = await Auth.create({
        uid,
        email,
        name,
        provider,
        role,
        profilePhoto,
      });
    }
    return res.status(200).json({
      message: "User Login SuccessFully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
    const sessionCookie = req.cookies.session;

    if (!sessionCookie) {
      return res.status(401).json({ message: "Unauthorized: No session" });
    }
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);

    await admin.auth().revokeRefreshTokens(decoded.uid);

    res.clearCookie("session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired session", success: false });
  }
};
export const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
