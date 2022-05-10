const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  publicPath: './',
  configureWebpack: {
    plugins: [
      // Copy over media resources from the Blockly package
      new CopyPlugin([
        {
          from: path.resolve(__dirname, './node_modules/blockly/media'),
          to: path.resolve(__dirname, 'dist/blockly-media')
        }
      ])
    ]
  }
}
