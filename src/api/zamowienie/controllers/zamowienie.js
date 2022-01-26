"use strict";

/**
 *  zamowienie controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::zamowienie.zamowienie",
  ({ strapi }) => ({
    async create(ctx) {
      console.log(ctx);
      console.log("ale fajna akcja");
      // Calling the default core action
      const { data, meta } = await super.find(ctx);
      return { data, meta };
    },
  })
);
