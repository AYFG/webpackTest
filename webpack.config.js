const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
require("dotenv").config();
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

// 모듈을 밖으로 빼내는 노드 JS문법이다. 엔트리 , 아웃풋 그리고 번들링 모드를 설정할 수 있다.

// mode가 production이면 main.js가 난독화되어 해석이 안된다.
module.exports = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  entry: {
    main: path.resolve("./src/app.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    // 로더를 추가하는 장소
    rules: [
      //   {
      //     test: /\.js$/,
      //     use: [path.resolve("./myLoader.js")],
      //   },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        // 여기 추가합니다.
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 80 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
      Commit Version : ${childProcess.execSync("git rev-parse --short HEAD")}
      Committer : ${childProcess.execSync("git config user.name")}
      마지막 빌드 시간은 : ${new Date().toLocaleString()}
      `,
    }),
    new webpack.DefinePlugin({
      // pw: 123456,
      // dev: JSON.stringify("https://dev.api.com"),
      // pro: JSON.stringify("https://pro.api.com"),
      dev: JSON.stringify(process.env.DEV_API),
      pro: JSON.stringify(process.env.PRO_API),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    // 이미지 압축 작업을 실행할지 결정함.
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin({
        test: /\.(jpe?g|png|gif|svg)/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [["imagemin-optipng", { optimizationLevel: 3 }]],
          },
        },
      }),
    ],
  },
};
