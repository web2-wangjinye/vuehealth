const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
  }
  const port = process.env.port || process.env.npm_config_port || 80 // 端口
module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/style/theme.less') // 注意路径
            ]
        }
    },
    // 例如 https://www.baidu.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.baidu.com/admin/，则设置 baseUrl 为 /admin/。
    publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
    // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
    outputDir: 'dist',
    // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    assetsDir: 'static',
     // 是否开启eslint保存检测，有效值：ture | false | 'error'
    lintOnSave: false,//process.env.NODE_ENV === 'development'
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    devServer: {
        open: false, // auto open brower 项目启动后自动打开浏览器...
        disableHostCheck: false,
        host: "0.0.0.0",
        port: port, // 修改端口号
        https: false,
        hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        proxy: {     // string | Object 解决跨域问题
            [process.env.VUE_APP_BASE_API]: {
                target: 'https://www.lotut.cn/', // 对应自己的 跨域地址 即请求的后端地址
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    chainWebpack: config => {
        // 适配
        // config.module
        // .rule('less') //如果你用的是sass就写sass，我用的是less所以就写less
        // .oneOf('vue')
        // .use('px2rem-loader')
        // .loader('px2rem-loader')
        // .before('postcss-loader') // this makes it work.
        // .options({ remUnit: 192, remPrecision: 8 }) // remUnit: 192代表以1920px为整体，如果设计稿的尺寸是750px，这里的值为75
        // .end()
        // svg图标
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
