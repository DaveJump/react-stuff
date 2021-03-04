
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./easy-popup.cjs.production.min.js')
} else {
  module.exports = require('./easy-popup.cjs.development.js')
}
