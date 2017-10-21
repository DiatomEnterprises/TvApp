const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const DashboardPlugin = require("webpack-dashboard/plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const ANIMATIONS = process.env.ANIMATIONS || false
const NODE_ENV = process.env.NODE_ENV || "development"

const config = {
  devtool: "eval",
  context: path.resolve("./src"),
  entry: {
    app: "./index.tsx",
    vendor: "./vendor.ts"
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].bundle.js",
    sourceMapFilename: "[name].bundle.map",
    devtoolModuleFilenameTemplate: function(info) {
      return "file:///" + info.absoluteResourcePath
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: ["node_modules", "server.js"],
        use: [
          { loader: "cache-loader" },
          {
            loader: "thread-loader",
            options: {
              workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
            }
          },
          {
            loader: "ts-loader",
            options: {
              happyPackMode: true
            }
          }
        ]
      },
      { test: /\.html$/, loader: "html-loader" },
      {
        test: /\.scss$/,
        use: ["css-hot-loader"].concat(
          ExtractTextPlugin.extract({
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
        )
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
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tsconfig: path.resolve("./tsconfig.json"),
      workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
    }),
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
    new DashboardPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    compress: true,
    port: 3000,
    hot: true
  }
}

module.exports = config
