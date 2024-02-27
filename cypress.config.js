const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'fy6wkw',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://pushing-it.vercel.app",
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    fixturesFolder: 'cypress/e2e/',
  },
  env: {
    usuario: "pushingit",
    password: "123456!",
    baseUrlAPI: 'https://pushing-it.onrender.com/api',
    token: ''
  }
});
