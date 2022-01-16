'use strict';

/**
 * zwroty service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::zwroty.zwroty');
