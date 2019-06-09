const merge = require('webpack-merge')
const dev = require('./build/webpack.dev.config')
const custom = require('./build/webpack.custom.config')

module.exports = merge(dev, custom);