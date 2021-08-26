module.exports = {
  outputDir: 'dist',
  devServer: {
    open: true, // 项目启动时是否自动打开浏览器
    proxy: {
      '/v1': { // 代理api
        // target: 'http://err.repaishop.com',
        target: 'http://localhost:8000/',
        // target: 'https://wzgapi.repaimall.com',
        changeOrigin: true // 是否跨域
      },
      '/im-server': {
        target: 'http://imapitest.repaishop.com',
        changeOrigin: true // 是否跨域
      },
      '/ww-server': {
        target: 'http://msg-api-test.repaimall.com',
        changeOrigin: true // 是否跨域
      }
    }
  }
}
