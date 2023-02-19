/*module.exports = {
  //publicPath: "/laramed-front/",
  publicPath: "/",
};*/

const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: process.env.NODE_ENV === "production" ? "/stagingfront" : "/",
});
