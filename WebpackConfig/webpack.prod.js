const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 将css单独抽出一个文件，解决闪屏问题
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const path = require("path");
module.exports = {
  // 入口

  entry: "./src/index.js",
  // output
  output: {
    // 所有文件的
    path: path.resolve(__dirname, "../dist"), // 绝对路径
    // 入口文件的名称
    filename: "static/js/index.js",
    // 在打包前清空path目录
    clean: true,
  },
  // loader
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i, // 只检测 xxx 文件
            // use 的执行顺序是右左，下上
            use: [
              // "style-loader", // 将 js 中的 css 样式创建 style 标签加载到 html 中生效
              MiniCssExtractPlugin.loader,
              "css-loader", //将 css 的资源编译成 commenjs 的模块到 js 中
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: ["postcss-preset-env"],
                  },
                },
              },
            ],
          },
          {
            test: /\.less$/i,
            use: [
              // 'style-loader',
              MiniCssExtractPlugin.loader,
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: ["postcss-preset-env"],
                  },
                },
              },
              "less-loader", //将 less 编译为 css
            ],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // 将 JS 字符串生成为 style 节点
              // 'style-loader',
              MiniCssExtractPlugin.loader,
              // 将 CSS 转化成 CommonJS 模块
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: ["postcss-preset-env"],
                  },
                },
              },
              // 将 Sass 编译成 CSS
              "sass-loader",
            ],
          },
          {
            test: /\.styl$/,
            use: [
              // 'style-loader',
              MiniCssExtractPlugin.loader,
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: ["postcss-preset-env"],
                  },
                },
              },
              "stylus-loader",
            ], // 将 Stylus 文件编译为 CSS
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
              // 当图片小于10 kb 才会打包
              // 优点 减少请求
              // 缺点 体积会稍大一点
              dataUrlCondition: {
                maxSize: 10 * 1024, // 10kb
              },
            },
            generator: {
              // 输出图片的文件路径
              // [hash:10] 图片hash前十位
              // [ext] 后缀
              filename: "static/images/[hash:10][ext][query]",
            },
          },
          // 处理一些其他资源
          {
            test: /\.(ttf|woff2?|map3|map4)$/,
            type: "asset/resource",
            generator: {
              // 输出的文件路径
              // [hash:10] 图片hash前十位
              // [ext] 后缀
              filename: "static/media/[hash:10][ext][query]",
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
          },
        ],
      },
    ],
  },
  // plugin
  plugins: [
    new ESLintWebpackPlugin({ context: path.resolve(__dirname, "../src") }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({ filename: "static/css/index.css" }),
    new CssMinimizerPlugin(),
  ],

  // mode
  mode: "production",
  devtool: "source-map",
};
