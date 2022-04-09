const path = require("path");

module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: 465,
        secure: true,
        auth: {
          user: env("EMAIL_USERNAME"),
          pass: env("EMAIL_PASSWORD"),
        },
        tls: {
          rejectUnauthorized: env("NODE_ENV") === "development" ? false : true,
        },
      },
      settings: {
        defaultFrom: "zubryleospedbialystok@gmail.com",
        defaultReplyTo: "zubryleospedbialystok@gmail.com",
      },
    },
  },
});
