const path = require("path");
const os = require("os");
module.exports = {
  // Other webpack configuration options...

  resolve: {
    fallback: {
      "os": false
    }
  },

};
