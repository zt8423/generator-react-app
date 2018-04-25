const webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css代码单独打包
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        bundle: ["babel-polyfill", __dirname + '/src/index.jsx'],
        //第三方库
        vendor: ["babel-polyfill", "react", "react-dom", "react-router"] //单独打包第三方库
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
        new CleanWebpackPlugin(['<%= WebProjectName %>']), //清理打包工程文件夹下无用的文件
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
        new ExtractTextPlugin('styles.[chunkhash:8].css'), //单独打包css输出的文件名字，在html中<link rel="stylesheet" href="./styles.css">引用就行
        //设置全局的变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        //将第三方库打包到vendor.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }), //第三方库打包到vendor.js文件里面，在html中引用就可以
    ],
};
