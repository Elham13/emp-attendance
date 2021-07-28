import dbConnect from "../../../server/utils/db";
import User from "../../../server/modals/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const { id } = req.query;
      try {
        const user = await User.findOne({ _id: id });
        if (user) {
          res.status(200).json({ success: true, user });
        } else {
          res
            .status(404)
            .json({ success: false, message: "No user with that ID" });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
    case "POST":
      try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, user });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(500).json({ success: false });
  }
};
