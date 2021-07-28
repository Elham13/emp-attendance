import dbConnect from "../../../server/utils/db";
import User from "../../../server/modals/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      const { mobileNumber, password } = req.body;
      try {
        const user = await User.findOne({ mobileNumber });
        if (user) {
          if (await user.passwordMatches(password)) {
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

    default:
      res.status(500).json({ success: false });
  }
};
