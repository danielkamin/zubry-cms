"use strict";

/**
 *  zwroty controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::zwroty.zwroty", ({ strapi }) => ({
  async createWithMail(ctx) {
    const orderData = ctx.request.body;
    const user = ctx.state.user;
    console.log(orderData.super);
    const { data, meta } = await super.create(ctx);
    const clientMessage = `
    <div style='display:flex;flex-direction:column;'>
    <p>Potwierdzenie dokonania zwrotu na zamówienie nr ${orderData.super.Numer_Zamowienia}</p>
    <p>Prosimy oczekiwać dalszych informacji drogą e-mailową.</p>
    </div>`;
    const adminMessage = `
    <div style='display:flex;flex-direction:column;'>
    <p>Potwierdzenie dokonania zwrotu na zamówienie nr ${orderData.super.Numer_Zamowienia}</p>
    </div>`;
    strapi.plugins["email"].services.email.send({
      to: process.env.EMAIL_ADMIN,
      subject: `Nowy zwrot`,
      html: adminMessage,
    });
    strapi.plugins["email"].services.email.send({
      to: user.email,
      subject: `Nowy zwrot`,
      html: clientMessage,
    });
    ctx.send({ data: "ok" });
  },
}));
