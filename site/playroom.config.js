const path = require('path');
const SkuWebpackPlugin = require('sku/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const browserslist = require('../browserslist');

module.exports = {
  components: '../packages/braid-design-system/src/playroom/components.ts',
  outputPath: './dist/playroom',
  title: 'BRAID',
  snippets: '../packages/braid-design-system/src/playroom/snippets.ts',
  themes: '../packages/braid-design-system/src/themes/index.ts',
  frameComponent:
    '../packages/braid-design-system/src/playroom/FrameComponent.tsx',
  scope: '../packages/braid-design-system/src/playroom/useScope.ts',
  typeScriptFiles: [
    '../packages/braid-design-system/src/**/*.{ts,tsx}',
    '!**/node_modules',
  ],
  widths: [320, 768, 1024, 1400],
  openBrowser: false,
  port: 8082,

  webpackConfig: () => ({
    plugins: [
      new MiniCssExtractPlugin({
        ignoreOrder: true,
      }),
      new SkuWebpackPlugin({
        include: ['lib', 'css', 'reset', 'themes'].map((dir) =>
          path.join(__dirname, dir),
        ),
        target: 'browser',
        browserslist,
        mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
        displayNamesProd: true,
        removeAssertionsInProduction: false,
        MiniCssExtractPlugin,
      }),
    ],
  }),
};
