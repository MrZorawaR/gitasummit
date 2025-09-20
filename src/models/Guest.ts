import mongoose from "mongoose";

const phone10 = /^[0-9]{10}$/;

const GuestSchema = new mongoose.Schema(
  {
    // Core identity
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      // simple format check; adjust if you use a stricter validator
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    address: { type: String, required: true, trim: true },

    // Contact numbers
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

    // Location
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },

    // Registration
    registrationId: { type: String, unique: true, required: true, trim: true },
    registrationType: {
      type: String,
      enum: ["guest"],
      required: true,
      default: "guest",
    },

    // Event ops
    checkedIn: { type: Boolean, default: false },

    // Bhagavad Gita (optional)
    followsGita: {
      type: String,
      enum: ["yes", "no"],
      default: undefined, // omit if not answered
    },
    gitaSelfRating: {
      type: String,
      enum: ["low", "medium", "high"],
      default: undefined, // only meaningful if followsGita === "yes"
    },
  },
  { collection: "guestDetails", timestamps: true }
);

// Optional: ensure gitaSelfRating only set when followsGita === "yes"
GuestSchema.pre("validate", function (next) {
  if (this.followsGita !== "yes") {
    this.gitaSelfRating = undefined;
  }
  next();
});

export default mongoose.models.GuestDetails ||
  mongoose.model("GuestDetails", GuestSchema);
