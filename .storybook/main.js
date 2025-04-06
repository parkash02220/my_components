const path = require('path');
/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: [
    "../src/components/**/*.mdx",
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    '@storybook/addon-docs',
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  staticDirs: ["../public"],

  webpackFinal: async (config) => {
    // Exclude the default CSS rule to prevent conflicts
    const cssRule = config.module.rules.find((rule) => rule.test && rule.test.toString().includes('.css'));
    if (cssRule) {
      cssRule.exclude = path.resolve(__dirname, '../');
    }

    // Add a rule for handling CSS files
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },

  // docs: {
  //   autodocs: true
  // }
};
export default config;
