'use strict';

const path = require('path');

// Process script files
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

// Extract and process CSS chunks
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');

// Process CSS files
const StylelintPlugin = require('stylelint-webpack-plugin');

// Process HTML templates 
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Process SVG files
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ProcessSvgSpritePlugin = require(path.resolve(__dirname, 'src/assets/scripts/webpack-plugins/ProcessSvgSpritePlugin.js'));

// Default configuration
const config = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, 'src'),
  entry: {
    vanda: './assets-vanda.js',
    fractal: './assets/styles/fractal-preview.scss'
  },
  output: {
    clean: true,
    filename: process.env.NODE_ENV === 'production' ? 'scripts/[name].[contenthash].js' : 'scripts/[name].js',
    path: path.resolve(__dirname, 'build')
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          }
        },
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: {
                filter: (url) => {
                  if (url.includes('vam-sprite.svg')) {
                    return false;
                  }

                  return true;
                },
              },
            },
          }, 
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postcssPresetEnv()
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'svg/vam-sprite.svg',
              esModule: false,
            }
          },
          {
            loader: 'svgo-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new ESLintPlugin(),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'production' ? 'styles/[name].[contenthash].css' : 'styles/[name].css'
    }),
    new StylelintPlugin(),
    new HtmlWebpackPlugin({
      template: 'components/_preview-layouts/_preview-template.html',
      filename: path.resolve(__dirname, 'src') + '/components/_preview-layouts/_preview.html'
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
      spriteAttrs: {
        class: 's-svg-icon'
      }
    }),
    new ProcessSvgSpritePlugin(),
  ]
};

module.exports = config;
