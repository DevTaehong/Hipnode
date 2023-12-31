"use server";

import { Resend } from "resend";

import EmailTemplate from "@/components/email/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: any) {
  const { email, name, messsage } = data;
  console.log(data);
  if (data) {
    try {
      const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["alexmonk17@gmail.com"],
        subject: "Hello world",
        react: EmailTemplate({ username: name, message: messsage }),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }
}

// https://www.youtube.com/watch?v=a8b3EN0R-M4
