const path = require("path");

module.exports = {
  mode: "production",
  target: ["web", "es5"],
  entry: "./src/App.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@framework": path.resolve(__dirname, "../Framework/src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, ".."),
        serveIndex: true,
        watch: true,
      },
    ],
    hot: true,
    port: 5000,
    host: "0.0.0.0",
    compress: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  devtool: "inline-source-map",
};
