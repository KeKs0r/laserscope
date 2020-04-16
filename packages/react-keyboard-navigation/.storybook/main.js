module.exports = {
  stories: ["../stories/**/*.stories.js"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],

  webpackFinal: async (config) => {
    // config.module.rules.push({
    //   test: /\.(ts|tsx)$/,
    //   use: [
    //     {
    //       loader: require.resolve("ts-loader"),
    //     },
    //     // Optional
    //     {
    //       loader: require.resolve("react-docgen-typescript-loader"),
    //     },
    //   ],
    // });
    // config.resolve.extensions.push(".ts", ".tsx");
    config.module.rules = config.module.rules.map((loaderConfig) => {
      const { use, include, exclude, ...rest } = loaderConfig;
      const babel = use && use.find((u) => u.loader === "babel-loader");
      if (babel) {
        babel.options.rootMode = "upward";
        const rootNodeModules = require("path").resolve("../../node_modules");
        const transformed = {
          use,
          exclude: [...exclude, rootNodeModules],
          ...rest,
        };
        // console.log(JSON.stringify(transformed, null, 2));
        return transformed;
      }
      return loaderConfig;
    });
    console.log();
    return config;
  },
};
