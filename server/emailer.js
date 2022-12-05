import nodemailer from "nodemailer";

export default class emailer {
  static instance;
  transporter;

  constructor() {
    emailer.instance = this;

    return;
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "test@gmail.com",
        pass: "password",
      },
    });
  }

  sendEmail(to, subject, text) {
    const message = {
      from: "test@gmail.com",
      to: to,
      subject: subject,
      text: text,
      attatchments: [
        {
          filename: "test.png",
          content: "logo",
        },
      ],
    };

    this.transporter.sendMail(message, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}
