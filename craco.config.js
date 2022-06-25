/* eslint-disable @typescript-eslint/no-var-requires */
// craco.config.js
const path = require(`path`);
const alias = require(`./src/config/aliases`);

const SRC = `./src`;
const aliases = alias(SRC);

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ])
);

module.exports = {
  webpack: {
    alias: resolvedAliases,
    module: {
      loaders: [
        {
          test: /plugin\.css$/,
          loaders: ["style-loader", "css"],
        },
      ],
    },
  },
  babel: {
    plugins: [
      ["babel-plugin-styled-components"],
      // ["transform-remove-console"],
    ],
    loaderOptions: (babelLoaderOptions) => {
      const origBabelPresetCRAIndex = babelLoaderOptions.presets.findIndex(
        (preset) => {
          return preset[0].includes("babel-preset-react-app");
        }
      );

      const origBabelPresetCRA =
        babelLoaderOptions.presets[origBabelPresetCRAIndex];

      babelLoaderOptions.presets[origBabelPresetCRAIndex] =
        function overridenPresetCRA(api, opts, env) {
          const babelPresetCRAResult = require(origBabelPresetCRA[0])(
            api,
            origBabelPresetCRA[1],
            env
          );

          babelPresetCRAResult.presets.forEach((preset) => {
            // detect @babel/preset-react with {development: true, runtime: 'automatic'}
            const isReactPreset =
              preset &&
              preset[1] &&
              preset[1].runtime === "automatic" &&
              preset[1].development === true;
            if (isReactPreset) {
              preset[1].importSource = "@welldone-software/why-did-you-render";
            }
          });

          return babelPresetCRAResult;
        };

      return babelLoaderOptions;
    },
  },
};
