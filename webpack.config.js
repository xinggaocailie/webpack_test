const path = require("path");
module.exports = {
  // 入口

  entry: "./src/index.js",
  // output
  output: {
    path: path.resolve(__dirname, "dist"), // 绝对路径
    filename: "index.js",
  },
  // loader
  module: {
    rules: [
      {
        test: /\.css$/i, // 只检测 xxx 文件
        // use 的执行顺序是右左，下上
        use: 
            [
                "style-loader", // 将 js 中的 css 样式创建 style 标签加载到 html 中生效
                "css-loader" //将 css 的资源编译成 commenjs 的模块到 js 中
            ],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',//将 less 编译为 css
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
    ],
  },
  // plugin
  plugins: [],
  // mode
  mode: "development",
};
