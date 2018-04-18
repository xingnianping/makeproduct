<template>
    <div>
        <nav>
            <div class="nav-logo clearfix">
                <img src="../assets/images/nav-logo.png" width="100" height="45"/>
            </div>
            <ul class="nav-list">
                <li v-for="(item,index) in daohangMap" :key="index" :class="($route.path).indexOf(item.path) > -1 ? 'on' : ''">
                    <router-link :to="item.path">{{item.name}}</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: '这个是导航',
                daohangMap: [
                    {
                        name: "首页",
                        path: "/makeIndex"
                    }, {
                        name: "制作商品",
                        path: "/makeProductList"
                    }, {
                        name: "制成品改价",
                        path: "/modifyPriceList"
                    }, {
                        name: "原材料管理",
                        path: "/materialList"
                    }
                ],
            }
        }
    }
</script>
