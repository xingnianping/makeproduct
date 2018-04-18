import Pagenation from './src/pagenation.vue'

Pagenation.install = function(Vue) {
    Vue.component(Pagenation.name, Pagenation);
}

export default Pagenation;