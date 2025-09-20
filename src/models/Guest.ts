import mongoose from "mongoose";

const GuestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    whatsapp: { type: String, required: true },
    
    registrationId: { type: String, unique: true, required: true },
    registrationType: { 
      type: String, 
      enum: ["guest"], 
      required: true 
    },
     
    checkedIn: { type: Boolean, default: false },
  },
  { collection: "guestDetails", timestamps: true }
);

export default mongoose.models.GuestDetails || mongoose.model("GuestDetails", GuestSchema);
