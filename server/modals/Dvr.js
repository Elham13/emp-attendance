import mongoose from "mongoose";

const DvrSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    BusinessName: {
      type: String,
      required: [true, "Business name is required"],
    },
    ContactPersonName: {
      type: String,
      required: [true, "Contact person name is required"],
    },
    ContactPersonNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "Contact person number is required"],
    },
    Email: String,
    Website: String,
    Category: {
      type: String,
      required: [true, "Category is required"],
    },
    DataSource: {
      type: String,
      required: [true, "Data source is required"],
    },
    Status: {
      type: String,
      required: [true, "Status is required"],
    },
    Remarks: String,
    AppointmentDate: Date,
    ClientRequirement: String,
    FollowUpDate: Date,
    Qoutation: String,
  },
  { timestamps: true }
);

export default mongoose.models.Dvr || mongoose.model("Dvr", DvrSchema);
