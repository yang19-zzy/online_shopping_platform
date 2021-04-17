const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {test: /\.css$/i, use: ['style-loader', 'css-loader'],},
            {test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource',},
            {test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource',},
            {test: /\.xml$/i, use: ['xml-loader'],},
            {test: /\.txt$/, use: 'raw-loader'}
        ],
    },
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devServer: {
    contentBase: './src',
    compress: true,
    port: 1234,
  },
  
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
            '**/*',
            '!static-files*',
            '!directoryToExclude/**',
        ]
    }),
    new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    // new HtmlWebpackPlugin({
    //     template: './src/index.html',
    //     filename: 'index.html'
    // }),
    // new HtmlWebpackPlugin({
    //     template: './src/home.html',
    //     filename: 'home.html'
    // }),
    // new HtmlWebpackPlugin({
    //     template: './src/sign-in.html',
    //     filename: 'sign-in.html'
    // }),
    // new HtmlWebpackPlugin({
    //     template: './src/sign-up.html',
    //     filename: 'sign-up.html'
    // }),
    // new HtmlWebpackPlugin({
    //     template: './src/home.html',
    //     filename:'home.html'
    // }),
    // new HtmlWebpackPlugin({
    //     template: './src/cart.html',
    //     filename: 'cart.html'
    // }),
    // new HtmlWebpackPlugin({
    //     template: './src/pay.html',
    //     filename: 'pay.html'
    // })
  ]
};