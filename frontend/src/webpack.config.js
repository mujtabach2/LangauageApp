const path = require("path");

module.exports = {
  // Other webpack configuration options...

  resolve: {
    fallback: {
      "path": require.resolve("os-browserify/browser")
    }
  },

  // Other webpack configuration options...
};
