module.exports = {
  publicPath: `/${process.env.VUE_APP_CONTEXT}`,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '车主大礼包',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8088,
    https: false,
    proxy: {
      '/tools-coupon': {
        target: 'http://10.103.6.74:9080/tools-coupon',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tools-coupon': '/'
        }
      }
    }
  }
};