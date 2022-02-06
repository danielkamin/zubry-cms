module.exports = {
  routes: [
    {
      method: "POST",
      path: "/zwroties/email",
      handler: "zwroty.createWithMail",
    },
  ],
};
