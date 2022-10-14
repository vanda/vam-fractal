'use strict';

const {merge} = require('webpack-merge');
const common = require('./webpack.common');

const config = merge(common, {
  devtool: 'source-map'
});

module.exports = config;
