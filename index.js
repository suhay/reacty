'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/exothermic.min.js');
} else {
  module.exports = require('./dist/exothermic.js');
}