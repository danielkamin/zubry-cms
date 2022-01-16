'use strict';

/**
 * zamowienie service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::zamowienie.zamowienie');
