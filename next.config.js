const withCSS = require('@zeit/next-css');
const withPWA = require('next-pwa');

module.exports = withPWA(
  withCSS({
    webpack(config, { dev }) {
      if (dev) {
        config.devtool = 'cheap-module-source-map';
      }
      config.module.rules.push({
        test: /.(woff(2)?|ttf|eot|svg)(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              outputPath: 'static/webfonts/',
              publicPath: '../webfonts/',
              name: '[name].[ext]',
            },
          },
        ],
      });

      return config;
    },
    pwa: {
      dest: 'public',
    },
  })
);
