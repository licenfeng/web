import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import md5 from './utils/md5'
import VueQuillEditor from 'vue-quill-editor'
import ElementUI from 'element-ui';
import fileDownload from 'js-file-download';
import qs from 'qs';
// 引入全局样式
import './assets/global.css'
import methodAll from './axios/methodAll'

// 富文本编辑器样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入ele插件标签及样式
import './plugins'
import 'element-ui/lib/theme-chalk/index.css'
// 引入阿里矢量图标，必须在ele后面
import './assets/iconfont/iconfont.css'


Vue.prototype.$axios=methodAll;
Vue.prototype.$qs=qs;
Vue.prototype.$md5=md5;
Vue.prototype.$fileDownload=fileDownload;
Vue.config.productionTip = false
Vue.use(VueQuillEditor)
Vue.use(ElementUI)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
