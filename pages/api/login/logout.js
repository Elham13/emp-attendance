import cookie from "cookie";
import dbConnect from "../../../server/utils/db";
import User from "../../../server/modals/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const user = await User.findById(req.body.id);
        user.activeTime = [...user.activeTime, req.body.clock];
        user.logoutReason = req.body.reason;
        await user.save();
        res
          .status(200)
          .json({ success: true, message: "Loged out successfully" });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res
        .status(500)
        .json({ success: false, message: `${method} method is not supported` });
  }
};
