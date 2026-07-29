"use server";
import { Resend } from "resend";
import { redirect } from "next/navigation";

// EMAIL SENDING FUNCTIONALITY
// ADD RESEND_API_KEY IN YOUR .env.local FILE

export const SendEmail = async (formdata: FormData) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "your_resend_api_key_here") {
    return { error: "Email service is not configured. Please set RESEND_API_KEY in your .env.local file." };
  }

  const message = formdata.get("message");
  const name = formdata.get("name");
  const SenderEmail = formdata.get("SenderEmail");

  if (!name || !SenderEmail || !message) {
    return { error: "All fields are required." };
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "moeomar686@gmail.com",
      subject: `New message from ${name} via Contact Form`,
      reply_to: `${SenderEmail}`,
      text: `From: ${name}\nEmail: ${SenderEmail}\n\nMessage:\n${message}`,
    });
  } catch (error) {
    console.error("[SendEmail] Resend API error:", error);
    return { error: "Failed to send email. Please try again later." };
  }

  redirect("/");
};

