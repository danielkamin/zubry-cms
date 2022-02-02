"use strict";

/**
 *  wiadomosc-kontaktowa controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::wiadomosc-kontaktowa.wiadomosc-kontaktowa",
  ({ strapi }) => ({
    async send(ctx) {
      const { data } = ctx.request.body;
      if (!data.nazwa || !data.wiadomosc || !data.email)
        return ctx.send("Brak wszystkich informacji!");

      const message = `<div>
    <h5>Wiadomość kontaktowa.</h5>
    <p>Imię i nazwisko osoby kontaktowej: ${data.nazwa}</p>
    <p>Email kontaktowy: ${data.email}</p>
    <p>Treść: ${data.wiadomosc}</p>
    </div>`;
      try {
        await strapi.plugins["email"].services.email.send({
          to: process.env.EMAIL_ADMIN,
          from: "Żubry Białystok",
          subject: "Nowa wiadomość kontaktowa",
          html: message,
        });
        // strapi.query("api::wiadomosc-kontaktowa.wiadomosc-kontaktowa").create({
        //   data: {
        //     Nazwa: nazwa,
        //     Wiadomosc: wiadomosc,
        //     Email: email,
        //   },
        // });
        ctx.send("Wiadomość wysłana!");
      } catch (err) {
        console.log(err);
        ctx.send("Wystąpił błąd przy wysyłaniu wiadomosci");
      }
    },
  })
);
