// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// __webpack_public_path__ = window.location.protocol === 'http:' ? 'http://i.sfimg.cn/store/replenish/' : 'https://is.sfimg.cn/store/replenish/'
import Vue from 'vue'
import App from './App'
import router from './router/routing'

import VueResourceExt from './common/plugin/resourceExt.vue.plugin'
import VueMethod from './common/plugin/method.vue.plugin'
import navigation from './module/Navigation.vue'
import top from './module/Top.vue'
import STUI from './components/index' //店长工具组件
import ElDatePicker from 'element-datepicker'
import '../src/assets/css/common.css'
import '../src/assets/css/reset.css'
import '../src/assets/css/makeproduct.css'
import '../src/assets/css/datepicker.css'
import '../src/assets/css/icon.css'

Vue.use(VueResourceExt)
Vue.use(VueMethod)
Vue.use(STUI) //店长工具组件
Vue.use(ElDatePicker) //日期控件
Vue.component('navigation', navigation)
Vue.component('top', top)
Vue.config.productionTip = false

// 生产时启用
// Vue.config.devtools = false

new Vue({
    el: '#app',
    router,
    components: {App},
    data () {
        return {
            msg: "这是单页实例",
        }
    },
    template: '<App/>',
});
