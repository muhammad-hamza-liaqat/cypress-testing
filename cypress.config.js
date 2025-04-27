const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.themoviedb.org',
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
});