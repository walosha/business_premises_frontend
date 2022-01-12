const path = require("path");
const sgMail = require("@sendgrid/mail");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name;
    this.url = url;
    this.from = `Administrator <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // Sendgrid
    return sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template

    const html = pug.renderFile(
      `${path.resolve(process.cwd(), "email")}/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().send(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome!");
  }

  async sendPasswordReset() {
    await this.send(
      "forget_password",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
};
