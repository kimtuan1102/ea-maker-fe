/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


module.exports = {
  devServer: {
    https: true,
    //host: 'dangnhap.mitc.vn',
    port: '443'
  },
  pwa: {
    workboxOptions: {
      exclude: [/OneSignal.*\.js$/],
    },
  },
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}
