module.exports = {
  routes: [
    {
      method: "POST",
      path: "/wiadomosc-kontaktowas/send",
      handler: "wiadomosc-kontaktowa.send",
    },
  ],
};
