const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        // 每个文件只会被一个loader处理
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
    new MiniCssExtractPlugin(),
  ],

  // 开发服务器，配置监听代码改变自动编译 react脚手架自动配置了 =》启动指令 npx webpack serve
  // 没有输出（eg: dist)，在内存中编译打包
  devServer: {
    host: "localhost",
    port: "3000",
    open: true,
    // hot: true,// 默认 hmr 为 true
  },

  // mode
  mode: "development",
  devtool: "cheap-module-source-map",
};
