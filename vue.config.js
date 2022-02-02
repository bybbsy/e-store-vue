module.exports = {
    publicPath: '/e-store-vue/',
    chainWebpack: config => {
        config
        .plugin('html')
        .tap(args => {
          args[0].title = 'E-store'
          return args
        })
      }
}