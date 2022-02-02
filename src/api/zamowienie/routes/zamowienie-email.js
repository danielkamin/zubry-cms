module.exports = {
  routes: [
    {
      method: "POST",
      path: "/zamowienies/confirm",
      handler: "zamowienie.sendConfirmationEmail",
    },
  ],
};
