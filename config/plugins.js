const path = require("path");

module.exports = ({ env }) => ({
  wysiwyg: {
    enabled: true,
    resolve: path.resolve(__dirname, "../src/plugins/wysiwyg"),
    config: {},
  },
  email: {
    provider: "smtp",
    providerOptions: {
      host: env("SMTP_HOST", "smtp.gmail.com"),
      port: 465,
      secure: true,
      username: env("SMTP_USERNAME"),
      password: env("SMTP_PASSWORD"),
      rejectUnauthorized: true,
      requireTLS: true,
      connectionTimeout: 1,
    },
    settings: {
      from: "zubryleospedbialystok@gmail.com",
      replyTo: "zubryleospedbialystok@gmail.com",
    },
  },
});
