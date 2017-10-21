const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const ANIMATIONS = process.env.ANIMATIONS || false
const NODE_ENV = process.env.NODE_ENV || "development"

const config = {
  devtool: "hidden-source-map",
  context: path.resolve("./src"),
  entry: {
    app: "./index.tsx",
    vendor: "./vendor.ts"
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].bundle.js",
    sourceMapFilename: "[name].bundle.map"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.tsx?$/,
        exclude: ["node_modules", "server.js"],
        use: ["ts-loader"]
      },
      { test: /\.html$/, loader: "html-loader" },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: false,
                importLoaders: true,
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                data: `$animations: ${ANIMATIONS};`
              }
            },
            {
              loader: "sass-resources-loader",
              options: {
                resources: [path.resolve("src/styles/utils.scss")]
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "#preact": path.resolve("./src/preact"),
      "#components": path.resolve("./src/components"),
      "#redux": path.resolve("./src/redux"),
      "#pages": path.resolve("./src/pages"),
      "#utils": path.resolve("./src/utils")
    }
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
      filename: "vendor.bundle.js"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    }),
    new CompressionPlugin({
      test: /\.js|\.html|\.css/
    })
  ]
}

module.exports = config
