"use server";

import { Resend } from "resend";

import EmailTemplate from "@/components/email/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: any) {
  const { email, subject, message, currentUrl } = data;

  if (data) {
    try {
      const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["alexmonk17@gmail.com"],
        subject,
        react: EmailTemplate({
          email,
          message,
          currentUrl,
        }),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }
}
