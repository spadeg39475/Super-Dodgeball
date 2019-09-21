const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry:"./src/index.js",
  output:{ 
    path:path.resolve("dist"),
    publicPath: '/dist',
    filename:"index_bundle.js" 
  },
  module: {
    rules: [
      {
        test: /\.(eot|woff|woff2|[ot]tf)$/,
        use: {
            loader: 'file-loader',
            // options: {
            //     name: '[name].[ext]',
            //     outputPath: './fonts/',
            //     publicPath: '/fonts/'
            // }
        }
    },
      { 
        test:/\.css$/, 
        use:[{loader:"style-loader"},{loader:"css-loader"}] 
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../")
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body"
    })
  ]
};
