const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//css代码单独打包
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const theme = require('./package.json').theme;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: false,
    entry: {
        bundle: __dirname + '/src/index.jsx',
        vendor: ["react","react-dom","react-router"]//单独打包第三方库
    },
    output: {
        path: path.resolve(__dirname , './<%= WebProjectName %>'),//打包后的js文件存放的地方
        filename: '[name].[chunkhash:8].js',//打包后输出的js的文件名
        publicPath:'/<%= WebProjectName %>/',//公共路径在页面或者css引入图片需要这个路劲
        chunkFilename: '[name].[chunkhash:8].chunk.js'//配合代码中require.ensure()来动态加载文件
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, '/node_modules')],
        extensions: ['.web.js', '.js', '.jsx', '.json'],
    },
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
          use: ExtractTextPlugin.extract({
            use: 'css-loader'
          })
        }, {
          test: /\.less$/,
          use: ['style-loader', 'less-loader']
        }, {
          test: /\.(png|jpg|eot|svg|ttf|woff|woff2)$/,
          use: ['url-loader?limit=8192&name=images/[hash:8].[name].[ext]']
        }, ],
    },
    plugins: [
        new CleanWebpackPlugin(['<%= WebProjectName %>']), //清理QlChoice文件夹下无用的文件
        new HtmlWebpackPlugin({ //创建一个index.html文件，直接引用打包的文件
            inject: true,
            template: 'template/index.html',
            cache: false
        }),
        // 定义为生产环境，编译 React 时压缩到最小
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                },
                warnings: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),//合并块
        new ExtractTextPlugin('style.[chunkhash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({name: ['vendor', 'manifest']}),//第三方库打包到vendor.js文件里面，在html中引用就可以
  ],
}
