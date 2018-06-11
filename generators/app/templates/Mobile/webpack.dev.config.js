const webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'webpack/hot/only-dev-server', // 为热替换（HMR）打包好运行代码 only- 意味着只有成功更新运行代码才会执行热替换（HMR）
        path.resolve(__dirname, './src/index.jsx'),
    ],

    output: { //输出目录
        path: path.resolve(__dirname, './dev'), //打包后的js文件存放的地方
        filename: 'bundle.js' //打包后输出的js的文件名
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'cheap-module-source-map',
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
            test: /\.(less|css)$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.(png|jpg|eot|svg|ttf|woff|woff2)$/,
            use: ['url-loader?name=images/[hash:8].[name].[ext]']
        }, ],
    },

    devServer: {
        hot: true, // 开启服务器的模块热替换（HMR）
        contentBase: path.resolve(__dirname, './dev'), // 输出文件的路径
        publicPath: '/', // 和上文output的"publicPath"值保持一致
        port: 8080, //设置默认监听端口，如果省略，默认为"8080"
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 开启全局的模块热替换（HMR）
        new webpack.NamedModulesPlugin(), // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
        //设置全局的变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
    ],
};
