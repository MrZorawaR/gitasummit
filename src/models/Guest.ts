import mongoose from "mongoose";

const phone10 = /^[0-9]{10}$/;

const GuestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    address: { type: String, required: true, trim: true },

    whatsapp: {
      type: String,
      required: true,
      trim: true,
      match: [phone10, "WhatsApp must be a 10-digit number"],
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      match: [phone10, "Mobile must be a 10-digit number"],
    },

    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },

    registrationId: { type: String, unique: true, required: true, trim: true },
    registrationType: {
      type: String,
      enum: ["guest"],
      required: true,
      default: "guest",
    },

    checkedIn: { type: Boolean, default: false },

    followsGita: {
      type: String,
      enum: ["yes", "no"],
      default: undefined,
    },
    gitaSelfRating: {
      type: String,
      enum: ["low", "medium", "high"],
      default: undefined,
    },
  },
  { collection: "guestDetails", timestamps: true }
);

GuestSchema.pre("validate", function (next) {
  if (this.followsGita !== "yes") {
    this.gitaSelfRating = undefined;
  }
  next();
});

export default mongoose.models.GuestDetails ||
  mongoose.model("GuestDetails", GuestSchema);
