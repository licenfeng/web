module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    overlay: {
      warning: false,
      errors: false
    },
    open: true,
    port: 8081,
    host: '0.0.0.0'
  }
}
