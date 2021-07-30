import dbConnect from "../../../server/utils/db";
import Dvr from "../../../server/modals/Dvr";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      // console.log(req.query);
      const pageSize = 4;
      const { pageNumber, keyword, id } = req.query;
      const page = Number(pageNumber) || 1;

      const keywd = keyword
        ? {
            Title: {
              $regex: keyword,
              $options: "i",
            },
            User: id,
          }
        : { User: id };

      try {
        const count = await Dvr.countDocuments({ ...keywd });
        const dvr = await Dvr.find({ ...keywd })
          .limit(pageSize)
          .skip(pageSize * (page - 1));

        // console.log("Page: ", page, "\nPages: ", Math.ceil(count / pageSize));
        res.status(200).json({
          success: true,
          page,
          pages: Math.ceil(count / pageSize),
          dvrs: dvr,
        });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case "POST":
      const {
        user,
        businessName,
        contactPersonName,
        contactPersonNumber,
        website,
        email,
        category,
        dataSrc,
        remarks,
        status,
        clientReq,
        qoutation,
        appointmentDate,
        followUpDate,
      } = req.body;

      try {
        const dvr = await Dvr.create({
          User: user,
          BusinessName: businessName,
          ContactPersonName: contactPersonName,
          ContactPersonNumber: contactPersonNumber,
          Email: email,
          Website: website,
          Category: category,
          DataSource: dataSrc,
          Status: status,
          Remarks: remarks,
          AppointmentDate: appointmentDate,
          ClientRequirement: clientReq,
          FollowUpDate: followUpDate,
          Qoutation: qoutation,
        });
        res.status(201).json({ success: true, dvr });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(500).json({ success: false });
  }
};
