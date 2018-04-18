import util from '../utils/common'
import cookieUtil from '../utils/cookie'

export default {
    install(Vue) {
        Vue.prototype.$changeDateToString = util.changeDateToString
        Vue.prototype.$containsObj = util.containsObj
        Vue.prototype.$removeByValue = util.removeByValue
        Vue.prototype.$getPartnerInfo = util.getPartnerInfo
        Vue.prototype.$setPartnerInfo = util.setPartnerInfo
        Vue.prototype.$numberDigits = util.numberDigits
        Vue.prototype.$format = util.dateFormat
        Vue.prototype.$deepCopy = util.deepCopy
        Vue.prototype.$merge = util.merge
        Vue.prototype.$getCookie = cookieUtil.getCookie
        Vue.prototype.$setCookie = cookieUtil.setCookie
        Vue.prototype.$delAllCookie = cookieUtil.delAllCookie
        Vue.prototype.$removeCookie = cookieUtil.removeCookie
    }
}