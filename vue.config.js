const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, '/src/assets/style/mixins.less'),
        path.join(__dirname, '/src/assets/style/variables.less'),
      ]
    }
  },
  // 配置开发服务器
  devServer: {
    // QQ三方登录的回调uri为：http://www.corho.com:8080/#/login/callback
    // vite 中配置： www.corho.com:8080
    host: "www.corho.com",
    port: 8080,
    // 其他有价值的配置项
    open: true, // 帮我们打开浏览器
    historyApiFallback: true,
    allowedHosts: "all",
  },
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  },
})
