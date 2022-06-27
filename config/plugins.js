const path = require("path");

module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.wp.pl"),
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
        defaultFrom: "zubrybiuro@wp.pl",
        defaultReplyTo: "zubrybiuro@wp.pl",
      },
    },
  },
});
