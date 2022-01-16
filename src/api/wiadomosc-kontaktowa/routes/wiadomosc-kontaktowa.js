"use strict";

/**
 * wiadomosc-kontaktowa router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter(
  "api::wiadomosc-kontaktowa.wiadomosc-kontaktowa"
);
