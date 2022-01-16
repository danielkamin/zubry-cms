"use strict";

/**
 *  wiadomosc-kontaktowa controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::wiadomosc-kontaktowa.wiadomosc-kontaktowa",
  ({ strapi }) => ({
    async send(ctx) {
      const { nazwa, wiadomosc, email } = ctx.request.body;
      if (!nazwa || !wiadomosc || !email)
        return ctx.send("Brak wszystkich informacji!");

      const message = `<div>
    <h5>Wiadomość kontaktowa.</h5>
    <p>Imię i nazwisko osoby kontaktowej: ${nazwa}</p>
    <p>Email kontaktowy: ${email}</p>
    <p>Treść: ${wiadomosc}</p>
    </div>`;
      try {
        strapi.plugins["email"].services.email.send({
          to: "zubryleospedbialystok@gmail.com",
          from: "zubryleospedbialystok@gmail.com",
          replyTo: "zubryleospedbialystok@gmail.com",
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
