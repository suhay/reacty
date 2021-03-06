const path = require(`path`)
const webpack = require(`webpack`)

module.exports = (env, options) => [
  {
    mode: `production`,
    target: `node`,
    node: {
      __dirname: true,
    },
    entry: {
      'server.exothermic': path.resolve(`./src/server.js`),
    },
    output: {
      path: path.resolve(`./dist`),
      filename: `[name].js`,
      libraryTarget: `umd`,
      publicPath: `/`,
      umdNamedDefine: true,
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components|dist)/,
        use: {
          loader: `babel-loader`,
          options: {
            presets: [`@babel/preset-env`],
            plugins: [
              require(`@babel/plugin-transform-react-jsx`),
              require(`@babel/plugin-transform-react-jsx-source`),
              require(`@babel/plugin-transform-react-jsx-self`),
              require(`@babel/plugin-proposal-object-rest-spread`),
            ],
          },
        },
      }, {
        test: /\.css$/,
        use: [`style-loader`, `css-loader`],
      }],
    },
  },
  {
    target: `web`,
    node: {
      __dirname: true,
      console: false,
      fs: `empty`,
      net: `empty`,
      tls: `empty`,
    },
    entry: {
      'browser.exothermic': path.resolve(`./src/browser.js`),
    },
    output: {
      path: path.resolve(`./dist`),
      filename: options.mode === `production` ? `[name].production.js` : `[name].development.js`,
      library: [`exothermic`, `browser`],
      libraryTarget: `umd`,
      publicPath: `/`,
      umdNamedDefine: true,
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components|dist)/,
        use: {
          loader: `babel-loader`,
          options: {
            presets: [`@babel/preset-env`],
            plugins: [
              require(`@babel/plugin-transform-react-jsx`),
              require(`@babel/plugin-transform-react-jsx-source`),
              require(`@babel/plugin-transform-react-jsx-self`),
              require(`@babel/plugin-proposal-object-rest-spread`),
            ],
          },
        },
      }, {
        test: /\.css$/,
        use: [`style-loader`, `css-loader`],
      }],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: `vendors`,
            chunks: `all`,
          },
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.WEBPACK_ENV': JSON.stringify(`browser`),
        'process.env.APP_ENV': (process.env.APP_ENV && JSON.stringify(process.env.APP_ENV)) || undefined,
        'process.env.BROWSER': JSON.stringify(true),
      }),
      new webpack.IgnorePlugin(/^esprima$/, /js-yaml/),
    ].filter(e => e),
  },
]
