const { defineConfig } = require("cypress");
const mongoose = require("mongoose");
const clearTestDB = require("./app/utils/clearTestDB");
const config = require("./app/utils/config");
const url = process.env.MONGO_URI_TEST;

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4173", // Vite preview
    setupNodeEvents(on, config) {
      on("task", {
        async clearTestDatabase() {
          await mongoose.connect(url);
          await clearTestDB();
          return null;
        },
      });
    },
  },
});
