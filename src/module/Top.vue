<template>
    <div>
        <header class="top">
            <div class="top-txt c64">
                <template v-for="(luyou,index) in luyous">
                    <router-link class="c32" :to="luyou.path | calculationRoute($route)" v-if="luyous.length!=index+1">
                        {{luyou.name}}
                    </router-link>
                    <i class="el-icon-arrow-right" v-if="luyous.length!=index+1"></i>
                    <span v-if="luyous.length==index+1">{{luyou.name}}</span>
                </template>
            </div>

            <div class="top-quit">
                <i class="icon-quit" @click="closeThis"></i>
            </div>
            <div class="top-shopname f18" v-if="partnerInfo!=null">{{partnerInfo.orgName}}</div>
        </header>
    </div>
</template>

<script>
    export default{
        data () {
            return {
                msg: '这个是模板页',
                luyous: [],
            }
        },
        watch: {
            $route (newVal,oldVal) {
                this.initRoutePath(newVal);
            }
        },
        filters: {
            /**
             * 路由路径拆分过滤器
             **/
            calculationRoute: function (value, self) {
                var path = self.path;
                if (path.indexOf(value) != -1) {
                    var num = path.indexOf(value) + value.length;
                    return path.substring(0, num)
                }
            }
        },
        methods: {
            /**
             * 初始化路由路径展示方法
             **/
            initRoutePath (newVal) {
                let str = newVal.path.substring(1);
                let paths = str.split("/");
                let names = newVal.name.split("-");
                var test = new Array(paths.length);
                for (var i = 0; i < paths.length; i++) {
                    var map = {
                        path: paths[i],
                        name: names[i]
                    }
                    test[i] = map;
                }
                this.luyous = test;
            },
            /**
             * 关闭窗口方法，因开发环境为v49谷歌浏览器，生产环境为v47，故下列两种写法有待上生产时验证，目前后者暂有效
             */
            closeThis: function () {
//              open(location, '_self').close();
                if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1) {
                    window.location.href = "about:blank";
                    window.close();
                } else {
                    window.opener = null;
                    window.open("", "_self");
                    window.close();
                }
            },
        },
        mounted () {
            this.initRoutePath(this.$route);
        },
        props: [
            'partnerInfo'
        ]
    }
</script>
