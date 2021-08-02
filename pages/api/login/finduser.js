import cookie from "cookie";
import dbConnect from "../../../server/utils/db";
import User from "../../../server/modals/User";
import { generateToken } from "../../../server/utils/auth";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, users });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case "POST":
      const { mobileNumber, password } = req.body;
      try {
        const user = await User.findOne({ mobileNumber });
        if (user) {
          if (await user.passwordMatches(password)) {
            const token = generateToken(user._id);
            res.setHeader(
              "Set-Cookie",
              cookie.serialize("auth", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 259200,
                path: "/",
              })
            );
            res.status(200).json({
              success: true,
              user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
                mobileNumber: user.mobileNumber,
                role: user.role,
              },
            });
          } else {
            res
              .status(400)
              .json({ success: false, message: "Incorrect password" });
          }
        } else {
          res
            .status(404)
            .json({ success: false, message: "No user with that ID" });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case "PUT":
      try {
        const user = await User.findById(req.body.id);

        user.fullName = req.body.fullName;
        user.email = req.body.email;
        user.mobileNumber = req.body.mobileNumber;
        user.role = req.body.role;
        if (req.body.password) user.password = req.body.password;
        await user.save();

        res
          .status(201)
          .json({ success: true, message: "User updated successfully" });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(500).json({ success: false });
  }
};
