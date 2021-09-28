module.exports = {
  publicPath: "/",
  devServer: {
    port: 5050,
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/variables.scss";`,
      },
    },
  },
};
