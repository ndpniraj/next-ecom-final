import { MailtrapClient } from "mailtrap";
import nodemailer from "nodemailer";

type profile = { name: string; email: string };

const TOKEN = process.env.MAILTRAP_TOKEN!;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT!;

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "nextecom@reactnativehive.com",
  name: "Next Ecom Verification",
};

interface EmailOptions {
  profile: profile;
  subject: "verification" | "forget-password" | "password-changed";
  linkUrl?: string;
}

const generateMailTransporter = () => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bcab674080b230",
      pass: "7fc09eafd1ea51",
    },
  });
  return transport;
};

const sendEmailVerificationLink = async (profile: profile, linkUrl: string) => {
  // const transport = generateMailTransporter();
  // await transport.sendMail({
  //   from: "verification@nextecom.com",
  //   to: profile.email,
  //   html: `<h1>Please verify your email by clicking on <a href="${linkUrl}">this link</a> </h1>`,
  // });

  const recipients = [
    {
      email: profile.email,
    },
  ];

  await client.send({
    from: sender,
    to: recipients,
    template_uuid: "eba72c1b-18b1-465d-af1a-913fad2fd2f6",
    template_variables: {
      subject: "Verify Your Email",
      user_name: profile.name,
      link: linkUrl,
      btn_title: "Click Me to Verify Email",
      company_name: "Next Ecom",
    },
  });
};

const sendForgetPasswordLink = async (profile: profile, linkUrl: string) => {
  // const transport = generateMailTransporter();

  // await transport.sendMail({
  //   from: "verification@nextecom.com",
  //   to: profile.email,
  //   html: `<h1>Click on <a href="${linkUrl}">this link</a> to reset your password.</h1>`,
  // });

  const recipients = [
    {
      email: profile.email,
    },
  ];

  await client.send({
    from: sender,
    to: recipients,
    template_uuid: "eba72c1b-18b1-465d-af1a-913fad2fd2f6",
    template_variables: {
      subject: "Forget Password Link",
      user_name: profile.name,
      link: linkUrl,
      btn_title: "Reset Password",
      company_name: "Next Ecom",
    },
  });
};

const sendUpdatePasswordConfirmation = async (profile: profile) => {
  // const transport = generateMailTransporter();

  // await transport.sendMail({
  //   from: "verification@nextecom.com",
  //   to: profile.email,
  //   html: `<h1>We changed your password <a href="${process.env.SIGN_IN_URL}">click here</a> to sign in.</h1>`,
  // });

  const recipients = [
    {
      email: profile.email,
    },
  ];

  await client.send({
    from: sender,
    to: recipients,
    template_uuid: "eba72c1b-18b1-465d-af1a-913fad2fd2f6",
    template_variables: {
      subject: "Password Reset Successful",
      user_name: profile.name,
      link: process.env.SIGN_IN_URL!,
      btn_title: "Sign in",
      company_name: "Next Ecom",
    },
  });
};

export const sendEmail = (options: EmailOptions) => {
  const { profile, subject, linkUrl } = options;

  switch (subject) {
    case "verification":
      return sendEmailVerificationLink(profile, linkUrl!);
    case "forget-password":
      return sendForgetPasswordLink(profile, linkUrl!);
    case "password-changed":
      return sendUpdatePasswordConfirmation(profile);
  }
};
