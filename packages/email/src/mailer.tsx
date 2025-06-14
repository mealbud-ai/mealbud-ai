import React from "react";
import { createTransport, Transporter } from "nodemailer";
import { render } from "@react-email/render";
import { WelcomeEmail } from "./templates/welcome-email";

export type SMTPConfig = {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
};

export class Mailer {
  private readonly transporter: Transporter;
  private readonly from: string;

  constructor(config: SMTPConfig) {
    this.transporter = createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: config.auth,
    });
    this.from = config.from;
  }

  public async sendWelcomeEmail(to: string, username: string): Promise<void> {
    const html = await render(<WelcomeEmail username={username} />);

    try {
      await this.transporter.sendMail({
        to,
        from: this.from,
        subject: "Bienvenue sur Ton App",
        html,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}
