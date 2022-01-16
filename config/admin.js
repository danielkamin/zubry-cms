module.exports = ({ env }) => ({
  url: env("ADMIN_URL", "http://localhost:1337/admin"),
  auth: {
    secret: env("ADMIN_JWT_SECRET", "90f13950f3e5a06a78d55375688110c0"),
  },
});
