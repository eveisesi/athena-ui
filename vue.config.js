module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
  },
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    disableHostCheck: true
  }
}
