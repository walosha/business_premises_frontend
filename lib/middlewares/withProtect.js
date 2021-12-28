import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../models/users";

const withProtect = (handler) => {
  return async (req, res) => {
    // Get token and check if it exists
    let token;
    if (
      req.cookies.st_accessToken ||
      req.headers?.authorization.startsWith("Bearer")
    ) {
      token =
        req.cookies.st_accessToken || req.headers?.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please log in to get access.",
      });
    }

    try {
      // Verify token
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      // Check if user exists with refresh token
      const currentUser = await User.findById(decoded.id).select(
        "-password,-__v"
      );
      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: "The user belonging to this token no longer exist.",
        });
      }

      // Grant access to protected route
      req.user = currentUser;

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Please log in to get access.",
      });
    }
  };
};

export default withProtect;
