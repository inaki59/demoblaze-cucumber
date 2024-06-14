const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify')

      on('file:preprocessor', browserify(config))

      return config
    },
    watchForFileChanges: false,
    setupNodeEvents,
    specPattern: "cypress/e2e/features/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    env: {
      TAGS: '@smoke'
    },
    baseUrl: "https://demoblaze.com",
    chromeWebSecurity: false,
    failOnStatusCode: false
  },
});