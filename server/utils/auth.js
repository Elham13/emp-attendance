import { sign, verify } from "jsonwebtoken";
import User from "../modals/User";

export const generateToken = (userId) => {
  return sign({ userId }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export const protect = (fun) => async (req, res) => {
  let token;

  if (req.cookies.auth) {
    try {
      token = req.cookies.auth;
      console.log("Token: ", token);

      const decoded = verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded).select("-password");

      return await fun(req, res);
    } catch (error) {
      console.log(error);
      res
        .status(401)
        .json({ message: "Not authorized, token failed (Invalid Token)" });
    }
  }

  if (!token) {
    res
      .status(401)
      .json({ message: "Not authorized, token failed (No Cookie)" });
  }
};

export const isAdmin = (fun) => (req, res) => {
  if (req.user && req.user.role === "admin") {
    return fun(req, res);
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};
