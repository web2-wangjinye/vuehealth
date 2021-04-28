const path = require('path')
function resolve(dir) {
    console.log(path.join(__dirname, dir))
    return path.join(__dirname, dir)
  }
module.exports = {
    lintOnSave: false,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/style/theme.less') // 注意路径
            ]
        }
    },
    devServer: {
        open: false, // auto open brower 项目启动后自动打开浏览器...
        disableHostCheck: false,
        host: "0.0.0.0",
        port: 8099, // 修改端口号
        https: false,
        hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        proxy: {     // string | Object 解决跨域问题
            '/api': {
                target: 'https://h.lotut.com/', // 对应自己的 跨域地址 即请求的后端地址
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    // configureWebpack: {
    //     name: '健康美肤',
    //     resolve: {
    //       alias: {
    //         '@': resolve('src')
    //       }
    //     }
    //   },
    // chainWebpack: (config) => {
    //     // config.resolve.alias
    //     //     .set('@', resolve('src')) //3.0的写法 映射路径 @代表src 比如要写一个图片 <img src='@/assets/img/1.jpg'/>就会读取src下assets下img下的图片
    //     const svgRule = config.module.rule('svg');
    //     svgRule.uses.clear();
    //     svgRule
    //         .test(/\.svg$/)
    //         .use('svg-sprite-loader')
    //         .loader('svg-sprite-loader')
    //         .options({
    //             symbolId: 'icon-[name]'
    //         });
    // },
    // chainWebpack: config => {
    //     config.module
    //     .rule('svg')
    //     .exclude.add(resolve('src/assets/icons'))
    //     .end()
    
    //     config.module
    //     .rule('icons')
    //     .test(/\.svg$/)
    //     .include.add(resolve('src/assets/icons'))
    //     .end()
    //     .use('svg-sprite-loader')
    //     .loader('svg-sprite-loader')
    //     .options({
    //       symbolId: 'icon-[name]'
    //     })
    //     .end()
    //   }
    chainWebpack: config => {
        // config.plugins.delete('preload') // TODO: need test
        // config.plugins.delete('prefetch') // TODO: need test
    
        // set svg-sprite-loader
        config.module
          .rule('svg')
          .exclude.add(resolve('src/assets/icons'))
          .end()
        config.module
          .rule('icons')
          .test(/\.svg$/)
          .include.add(resolve('src/assets/icons'))
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'icon-[name]'
          })
          .end()
      }
};
