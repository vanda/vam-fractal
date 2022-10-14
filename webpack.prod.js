'use strict';

const {merge} = require('webpack-merge');
const common = require('./webpack.common');

const config = merge(common, {
  devtool: false
});

module.exports = config;
