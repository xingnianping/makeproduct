/**
 * @function: 获取cookie
 * @pramas: cookie名称
 */
const getCookie = function (name) {
    const data = document.cookie;
    const dataArray = data.split("; ");
    for (let i = 0; i < dataArray.length; i++) {
        const letName = dataArray[i].split("=");
        if (letName[0] == name) {
            return decodeURIComponent(letName[1]);
        }
    }
}
/**
 * @function: 删除全部cookie
 */
const delAllCookie = function () {
    const myDate = new Date();
    myDate.setTime(-1000);//设置时间
    const data = document.cookie;
    const dataArray = data.split("; ");
    for (let i = 0; i < dataArray.length; i++) {
        const letName = dataArray[i].split("=");
        document.cookie = letName[0] + "=''; expires=" + myDate.toGMTString();
    }
}

/**
 * @function: 设置cookie
 */
    const setCookie = function (name, value, expires, domain, path, secure) {
    var cookieText = "";
    cookieText += encodeURIComponent(name) + "=" + encodeURIComponent(value);

    if (expires instanceof Date) {
        cookieText += "; expires=" + expires.toGMTString();
    }
    if (path) {
        cookieText += "; path=" + path;
    }
    if (domain) {
        cookieText += "; domain=" + domain;
    }
    if (secure) {
        cookieText += "; secure";
    }
    document.cookie = cookieText;
    /*var exp = new Date();
    exp.setTime(exp.getTime() + expires*24*60*60*1000);
    document.cookie = name + "="+ value + ";expires=" + exp.toGMTString();*/
}

/**
 * 删除单个cookie
 * @param cookieName
 * @constructor
 */
const removeCookie = function (cookieName) {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].indexOf(" ") == 0) {
            cookies[i] = cookies[i].substring(1);
        }
        if (cookies[i].indexOf(cookieName) == 0) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 60 * 1000);
            document.cookie = cookies[i] + ";expires=" + exp.toUTCString();
            break;//要删除的cookie已经在客户端被删除掉，跳出循环
        }
    }
}

export default {
    removeCookie,
    setCookie,
    getCookie,
    delAllCookie
}
