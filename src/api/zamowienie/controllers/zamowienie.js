"use strict";

/**
 *  zamowienie controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::zamowienie.zamowienie",
  ({ strapi }) => ({
    async sendConfirmationEmail(ctx) {
      const orderData = ctx.request.body;
      const user = ctx.state.user;
      let orderDetails = "";
      orderData.data.Szczegoly.forEach((product) => {
        orderDetails += `<tr><td>${product.Produkt}</td><td>${product.Rozmiar}</td><td>${product.Ilosc}</td></tr>`;
      });
      const clientMessage = `<div>
    <h3>Potwierdzenie zamówienia nr ${orderData.data.Numer_Zamowienia}</h3>
    <div style='display:flex;flex-direction:column;'>
      <p><b>Dane do zamówienia:</b></p>
      <span>${user.Imie}</span>
      <span>${user.Nazwisko}</span>
      <span>${user.email}</span>
      <span>${orderData.data.Miasto}</span>
      <span>${orderData.data.Numer_Budynku}</span>
      <span>${orderData.data.Numer_Mieszkania}</span>
      <span>${orderData.data.Kod_Pocztowy}</span>
    </div>
    <p><b>Opcjonalna notatka do zamówienia:</b> ${orderData.data.Notatka}</p>
    <br/>
    <table>
      <tr>
        <th>Produkt</th>
        <th>Rozmiar</th>
        <th>Ilość</th>
      </tr>
      ${orderDetails}
    </table>
    </div>`;

      try {
        await strapi.plugins["email"].services.email.send({
          to: process.env.EMAIL_ADMIN,
          subject: `Potwierdzenie zamówienia nr ${orderData.data.Numer_Zamowienia}`,
          html: clientMessage,
        });
        strapi.plugins["email"].services.email.send({
          to: user.email,
          subject: `Potwierdzenie zamówienia nr ${orderData.data.Numer_Zamowienia}`,
          html: clientMessage,
        });
        ctx.send({ data: "ok" });
      } catch (err) {
        console.log(err);
      }
    },
  })
);
