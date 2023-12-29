const path = require("path");
const os = require("os");

module.exports = {

  resolve: {
    fallback: {
      "os": require.resolve("os-browserify/browser"),
      "path": require.resolve("path-browserify")
    }
  },

};
