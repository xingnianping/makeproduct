import axios from 'axios'
import cookieUtil from '../utils/cookie'

// /*替换https*/
// function replaceHttp(data){
//   if(location.protocol=='https:'){
//     var tempdata = JSON.stringify(data);
//     var reg1 = new RegExp("http://p02.t.com","g");
//     var reg2 = new RegExp("http://pic.t.com","g");
//     var reg3 = new RegExp("http://store-v01.t.com","g");
//     var reg4 = new RegExp("http://p02.sfbest.com","g");
//     var reg5 = new RegExp("http://pic.sfbest.com","g");
//     var reg6 = new RegExp("http://store-v01.sfbest.com","g");
//     var reg7 = new RegExp("http://i.sfbest.com","g");
//     var resultdata = tempdata.replace(reg1, 'https://ps02.sfbest.com');
//     resultdata = resultdata.replace(reg2, 'https://pics.sfbest.com');
//     resultdata = resultdata.replace(reg3, 'https://store-v01.sfbest.com');
//     resultdata = resultdata.replace(reg4, 'https://ps02.sfbest.com');
//     resultdata = resultdata.replace(reg5, 'https://pics.sfbest.com');
//     resultdata = resultdata.replace(reg6, 'https://store-v01.sfbest.com');
//     resultdata = resultdata.replace(reg7, 'https://is.sfbest.com');
//     var retObj = JSON.parse(resultdata);
//     return retObj;
//   }else{
//     return data;
//   }
// }

/*替换https*/
function replaceHttp(data){
  if(location.protocol=='https:'){
    var tempdata = JSON.stringify(data);
    var reg1 = new RegExp("http://p02.t.com","g");
    var reg2 = new RegExp("http://pic.t.com","g");
    var reg3 = new RegExp("http://store-v01.t.com","g");
    var reg4 = new RegExp("http://p02.sfbest.com","g");
    var reg5 = new RegExp("http://pic.sfbest.com","g");
    var reg6 = new RegExp("http://store-v01.sfbest.com","g");
    var reg7 = new RegExp("http://i.sfbest.com","g");
    var reg8 = new RegExp("http://p02.sfimg.cn","g");
    var reg9 = new RegExp("http://pic.sfimg.cn","g");
    var reg10 = new RegExp("http://store-v01.sfimg.cn","g");
    var resultdata = tempdata.replace(reg1, 'https://ps02.sfimg.cn');
    resultdata = resultdata.replace(reg2, 'https://pics.sfimg.cn');
    resultdata = resultdata.replace(reg3, 'https://store-v01.sfimg.cn');
    resultdata = resultdata.replace(reg4, 'https://ps02.sfimg.cn');
    resultdata = resultdata.replace(reg5, 'https://pics.sfimg.cn');
    resultdata = resultdata.replace(reg6, 'https://store-v01.sfimg.cn');
    resultdata = resultdata.replace(reg7, 'https://is.sfimg.cn');
    resultdata = resultdata.replace(reg8, 'https://ps02.sfimg.cn');
    resultdata = resultdata.replace(reg9, 'https://pics.sfimg.cn');
    resultdata = resultdata.replace(reg10, 'https://store-v01.sfimg.cn');
    var retObj = JSON.parse(resultdata);
    return retObj;
  }else{
    var tempdata = JSON.stringify(data);
    var reg1 = new RegExp("http://p02.sfbest.com","g");
    var reg2 = new RegExp("http://pic.sfbest.com","g");
    var reg3 = new RegExp("http://store-v01.t.com","g");
    var resultdata = tempdata.replace(reg1, 'http://p02.sfimg.cn');
    resultdata = resultdata.replace(reg2, 'http://pic.sfimg.cn');
    resultdata = resultdata.replace(reg3, 'http://store-v01.sfimg.cn');
    return data;
  }
}

const action = function (url, method, dat, opt) {
    const data = dat || {}
    const option = opt || {}
    option.headers = option.headers || {}
    option.headers['ssi-token'] = cookieUtil.getCookie("token");
    option.withCredentials = true
    const promise = new Promise((resolve, reject) => {
        let req
        if (/^p/.test(method)) {
            req = axios[method](url, data, option)
        } else {
            option.params = data
            req = axios[method](url, option)
        }
        req.then((response) => {
            if (response.status==200) {
                let tmp = response.data
                if (typeof (tmp) === 'string') {
                    try {
                        tmp = JSON.parse(tmp)
                    } catch (e) {
                    }
                }
                if (tmp.errorCode == 0) {
                  let data = replaceHttp(tmp.data);
                    resolve(data)//操作成功
                } else {
                    reject(tmp);
                }
            }

        }, (response) => {
            if (response.response.status==500) {
                reject({errorCode: 500, errorMsg: '服务器异常，请刷新页面或者联系系统管理员！'})
            }else if (response.response.status==403) {
                cookieUtil.delAllCookie();
                reject({errorCode: 403, errorMsg: '登录超时，请重新登录！'});
            }else if (response.response.status==404) {
                reject({errorCode: 404, errorMsg: '资源访问访问出错，请联系管理员!'});
            }else {
                reject({errorCode: -1, errorMsg: '网络异常，请刷新页面或者联系系统管理员！'})
            }
        })
    })
    return promise
}

const httpExt = {
    put(url, data, option) {
        return action(url, 'put', data, option)
    },
    putForm(url, data, option) {
        const opt = option || {}
        opt.headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        opt.emulateJSON = true
        return action(url, 'put', data, opt)
    },
    post(url, data, option) {
        return action(url, 'post', data, option)
    },
    postJson(url, data, option) {
        const opt = option || {}
        opt.headers = {
            'Content-Type': 'application/json; charset=UTF-8;'
        }
        return action(url, 'post', data, opt)
    },
    postForm(url, data, option) {
        const opt = option || {}
        opt.headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        opt.emulateJSON = true
        return action(url, 'post', data, opt)
    },
    get(url, data, option) {
        /**添加时间戳,防止ie有缓存*/
        const data2 = data ? Object.assign(data, {time: new Date().getTime()}) : data;
        return action(url, 'get', data2, option)
    },
    delete(url, data, option) {
        return action(url, 'delete', data, option)
    }
}

export default {
    install(Vue) {
        axios.defaults.baseURL = "/replenish/api/v1/p/";
        axios.defaults.timeout = 100000000;
        axios.defaults.transformRequest = [function (data) {
            let newData = ''
            for (let k in data) {
                newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
            }
            return newData
        }]

        Vue.prototype.$axios = axios
        Vue.prototype.$httpExt = function () {
            return httpExt
        }
    }
}
