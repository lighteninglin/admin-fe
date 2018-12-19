const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: WEBPACK_ENV === 'dev' 
    ? '/dist/' : '//118.31.69.104/admin-fe/dist/',
    filename: 'js/app.js'
  },
  resolve: {
    alias: {
      page: path.resolve(__dirname, 'src/page'),
      component: path.resolve(__dirname, 'src/component'),
      util: path.resolve(__dirname, 'src/util'),
      service: path.resolve(__dirname, 'src/service')
    }
  },
  mode: 'development',
  devServer: {
    port: 8086,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy:{
      '/manage':{
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      },
      '/user/logout.do':{
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: './favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', 'react']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
};