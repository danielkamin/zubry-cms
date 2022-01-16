'use strict';

/**
 * terminarz-3-lm service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::terminarz-3-lm.terminarz-3-lm');
