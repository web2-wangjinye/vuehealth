# vuehealth

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### 自定义主题色-https://blog.csdn.net/weixin_43851013/article/details/109320870
首先安装一个主题生成工具，建议不用全局安装
npm i element-theme -D
然后安装白垩主题
npm i element-theme-chalk -D
// 第一步如果是局部安装，使用这个命令
node_modules/.bin/et  -i  【自定义变量文件】
node_modules/.bin/et  -i theme
// 自定义输出文件路径
node_modules/.bin/et  -i ./src/assets/css/element-diy.scss
// 输出到根目录
// 第一步初始化变量时如果是全局安装
et
// 第一步初始化变量时如果是局部安装S
node_modules/.bin/et
加-c是因为用的自定义变量名，所以需要通过加一个-c参数，后面跟一个路径（这个路径就是上一步新建的那个scss文件的那个路径）；然后再在后面加一个-o参数，再跟一个路径，表示需要输出到的指定路径
 node_modules/.bin/et   -c  ./src/style/element/element-diy.scss  -o  ./src/style/element/theme

 ###vue3使用less 颜色变量-https://blog.csdn.net/Poppy_LYT/article/details/111174595
 1、yarn add style-resources-loader vue-cli-plugin-style-resources-loader -D
 2、vue.config.js引入
pluginOptions: {
    'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
            path.resolve(__dirname, './src/style/theme.less' // 注意路径
        ]
    }
}
###适配https://blog.csdn.net/weixin_41257563/article/details/97266234
    createCSSRule('less', /\.less$/, 'px2rem-loader', Object.assign(
      { remUnit: 192},
      defaultSassLoaderOptions,
      loaderOptions.scss || loaderOptions.sass
    ))
###引入svg图表npm install svg-sprite-loader --save-dev
https://www.cnblogs.com/xzybk/p/12589045.html
https://blog.csdn.net/weixin_32075745/article/details/113323619
