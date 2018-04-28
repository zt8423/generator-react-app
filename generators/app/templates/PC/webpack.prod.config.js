const webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    bundle: ["babel-polyfill", __dirname + '/src/index.jsx']
  },
  output: { //输出目录
    path: path.resolve(__dirname, './<%= WebProjectName %>'), //打包后的js文件存放的地方
    filename: '[name].[chunkhash:8].js', //打包后输出的js的文件名
    publicPath: '/<%= WebProjectName %>/' //公共路径在页面或者css引入图片需要这个路径
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: false,
  module: {
    rules: [{
      test: /\.js[x]?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-2', 'react']
        }
      }],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader','less-loader']
    }, {
      test: /\.(png|jpg|eot|svg|ttf|woff|woff2)$/,
      use: ['url-loader?limit=8192&name=images/[hash:8].[name].[ext]']
    }, ],
  },
  plugins: [
    //设置全局的变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CleanWebpackPlugin(['WebMainManageSystem']), //清理打包工程目录文件夹下无用的文件
    new HtmlWebpackPlugin({ //创建一个index.html文件，直接引用打包的文件
      inject: false,
      title: '<%= Title %>',
      filename: 'index.html',
      meta: [{
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no'
      }],
      template: require('html-webpack-template'),
      appMountId: 'root'
    }),
    new webpack.optimize.AggressiveMergingPlugin(), //合并块
    new MiniCssExtractPlugin({
      chunkFilename: 'styles.[chunkhash:8].css'
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks:{
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        }
      }
    }
  }
};
