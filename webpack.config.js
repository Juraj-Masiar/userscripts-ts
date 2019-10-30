const path = require('path');
const WebpackUserscript = require('webpack-userscript');
const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: dev ? 'development' : 'production',
  entry: {
    facebook_chat_resize: path.resolve(__dirname, 'src', 'facebook_chat_resize', 'facebook_chat_resize.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].user.js'
  },
  module: {
    rules: [
      // {   // Replace all placeholders - $IS_FIREFOX / $IS_CHROME / $IS_PROD / $IS_DEV
      //   test: /\.tsx?$/,
      //   loader: 'string-replace-loader',
      //   options: {
      //     multiple: Object.entries(replacements)
      //       .map(([search, replace]) => ({
      //         search: escapeRegExp(search),
      //         replace: String(replace),
      //         flags: 'g'
      //       }))
      //   }
      // },
      {   // TypeScript loader
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: dev,
              experimentalWatchApi: true,
            },
          },
        ],
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    disableHostCheck: true,
    liveReload: false,

  },
  plugins: [
    new WebpackUserscript({
      headers ({ version }) {
        const buildTime = Date.now();
        return {
          version: `${version}-build.${buildTime}`
        }
      }
    }),
  ]
};
