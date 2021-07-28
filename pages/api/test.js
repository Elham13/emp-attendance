import dbConnect from "../../server/utils/db";
import Note from "../../server/modals/Note";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const note = await Note.find({});
        res.status(200).json({ success: true, note });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    case "POST":
      try {
        const note = await Note.create(req.body);
        res.status(201).json({ success: true, note });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(500).json({ success: false });
  }
};
