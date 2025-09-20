import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import GuestDetails from "@/models/Guest";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

// --- Email Templates ---

const THEME_COLOR = "#b45309"; // Amber 700

// Template for the user confirmation email
const createUserEmailHtml = (name: string, registrationId: string) => `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
  <div style="background-color: ${THEME_COLOR}; color: white; padding: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
    <h1 style="margin: 0; text-align: center;">Youth Gita Summit 2025</h1>
  </div>
  <div style="padding: 20px;">
    <h2 style="color: ${THEME_COLOR};">Welcome, ${name}! Your Journey Begins.</h2>
    <p>Thank you for registering for the Youth Gita Summit 2025. We are honored to confirm your place and look forward to welcoming you to this transformative experience.</p>
    <p>Please keep this confirmation for your records. Your unique Registration ID is:</p>
    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
      <strong style="font-size: 1.2em; color: #333;">${registrationId}</strong>
    </div>
    <h3 style="color: ${THEME_COLOR};">What's Next?</h3>
    <p>We will be in touch with further details, including the event schedule and other important information, as we get closer to the summit date. Please keep an eye on your inbox.</p>
    <p>With warm regards,</p>
    <p><strong>GIEO Gita Team</strong></p>
  </div>
  <div style="background-color: #f5f5f5; color: #888; padding: 15px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; font-size: 0.9em;">
    <p>This is an automated email. Please do not reply directly.</p>
  </div>
</div>
`;

// Template for the admin notification email
const createAdminEmailHtml = (data: any, registrationId: string) => `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
  <div style="background-color: #333; color: white; padding: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
    <h1 style="margin: 0; text-align: center;">New Summit Registration</h1>
  </div>
  <div style="padding: 20px;">
    <p>A new participant has registered for the Youth Gita Summit 2025.</p>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${data.name}</td></tr>
      <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${data.email}</td></tr>
      <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 8px; font-weight: bold;">WhatsApp:</td><td style="padding: 8px;">${data.whatsapp}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Registration ID:</td><td style="padding: 8px;">${registrationId}</td></tr>
    </table>
    <div style="text-align: center; margin-top: 20px;">
      <a href="https://yourwebsite.com/admin" style="background-color: ${THEME_COLOR}; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Dashboard</a>
    </div>
  </div>
</div>
`;

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const data = await req.json();
    const registrationId = uuidv4();

    // NOTE: Based on our previous work, I've removed QR code, payment logic, etc.
    const newGuest = new GuestDetails({
      ...data,
      registrationId,
      registrationType: "guest",
    });
    await newGuest.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send styled email to the user
    await transporter.sendMail({
      from: `"Youth Gita Summit" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "Registration Confirmed: Youth Gita Summit 2025",
      html: createUserEmailHtml(data.name, registrationId),
    });

    // Send styled email to the admin
    await transporter.sendMail({
      from: `"Youth Gita Summit" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Participant Registration | Youth Gita Summit",
      html: createAdminEmailHtml(data, registrationId),
    });

    return NextResponse.json({
      success: true,
      registrationId,
      message: "Registration successful! A confirmation email has been sent.",
    });
  } catch (error) {
    console.error("Error saving guest:", error);
    return NextResponse.json(
      { success: false, message: "Failed to register guest." },
      { status: 500 }
    );
  }
}
