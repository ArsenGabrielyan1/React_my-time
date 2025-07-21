const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

module.exports = (env, argv) => {
  const { mode } = argv;
  const prod = mode === "production";
  const _shellPath = prod ? "__PUBLIC_PATH__/dist/" : "http://localhost:8080/";

  return {
    output: {
      publicPath: prod ? "__MUSIC_PATH__/dist/" : "http://localhost:8091/",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      alias: {
        // Define aliases here
        "@components": `${__dirname}/src/components`,
        "@utils": `${__dirname}/src/utils`,
        "@pages": `${__dirname}/src/pages`,
        "@assets": `${__dirname}/src/assets`,
        "@common": `${__dirname}/src/components/common`,
        "@server": `${__dirname}/src/server`,
        "@hooks": `${__dirname}/src/hooks`,
        "@routing": `${__dirname}/src/routing`,
      },
    },

    devServer: {
      port: 8091,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "music",
        filename: "remoteEntry.js",
        remotes: {
          shell: `shell@${_shellPath}remoteEntry.js`,
        },
        exposes: {
          "./MusicIndex": "./src/bootstrap",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
