const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");

// 모듈을 밖으로 빼내는 노드 JS문법이다. 엔트리 , 아웃풋 그리고 번들링 모드를 설정할 수 있다.

module.exports = {
  mode: "development",
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
  ],
};
