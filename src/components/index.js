/**
 * @author shauning
 * Date: 18/03/20
 */
import MetaInfo from './meta-info/index'
import WLoadingBar from './loading-bar/index'
import stButton from './button/index'
import stInput from './input/index'
import stDialog from './dialog/index'
import stInputNumber from './input-number/index'
import stLoading from './loading/index'
import stPagenation from './pagenation/index'
import stNotification from './notification/index'

const components = [
    stButton,
    stInput,
    stDialog,
    stInputNumber,
    stLoading,
    stPagenation,
    stNotification
]

const install = function(Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
    MetaInfo.install(Vue)
    Vue.prototype.$loading = WLoadingBar
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    stButton,
    stInput,
    stDialog,
    stInputNumber,
    stLoading,
    stPagenation,
    stNotification
}