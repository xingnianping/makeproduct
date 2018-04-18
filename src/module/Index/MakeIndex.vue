<template>
    <div>
        <!-- S 首页列表 -->
        <ul class="make-index-list list-hover clearfix">
            <li>
                <h2 class="c32 f18">已制作商品
                    <router-link class="act c64 fr" to="/modifyPriceList"><i class="el-icon-arrow-right"></i></router-link>
                </h2>
                <div class="c64 make-index-list-top">
                    <p class="f12">门店正在销售的制成品有</p>
                </div>
                <div class="make-index-list-middle text-center f18 c96"><span class="f72">{{manufacturesNum}}</span>款</div>
                <p class="c96 make-index-list-bot f14 text-center"><span class="f16">{{manufacturesStockNum}}库存</span></p>
            </li>
            <li>
                <h2 class="c32 f18">制成品总价值
                    <router-link class="act c64 fr" to="/modifyPriceList"><i class="el-icon-arrow-right"></i></router-link>
                </h2>
                <div class="c64 make-index-list-top">
                    <p class="f12">门店正在销售的制成品累计</p>
                </div>
                <div class="make-index-list-middle text-center f18 c96"><span class="f46">{{manufacturesTotalPrice}}</span>元</div>
                <p class="c96 make-index-list-bot f14 text-center">
                    <st-button size="s" @click="toMakeModifyPriceList">去改价</st-button>
                </p>
            </li>
            <li>
                <h2 class="c32 f18">原材料管理
                    <router-link class="act c64 fr" to="/materialList"><i class="el-icon-arrow-right"></i></router-link>
                </h2>
                <div class="c64 make-index-list-top">
                    <p class="f12">门店当前已领取原材料款数</p>
                </div>
                <div class="make-index-list-middle text-center f18 c96"><span class="f72">{{rawMaterialSkuNum}}</span>款</div>
                <p class="c96 make-index-list-bot f14 text-center">
                    <st-button size="s" @click="toMaterialList">查看原材料</st-button>
                </p>
            </li>
            <li>
                <h2 class="c32 f18">制作商品当日销售
                </h2>
                <div class="c64 make-index-list-top">
                    <p class="f12">{{currentDate | formatDate}} 当天</p>
                </div>
                <div class="make-index-list-middle text-center f18 c96"><span class="f72">{{manufacturesSaleNum}}</span>笔订单</div>
                <p class="c96 make-index-list-bot f14 text-center">
                    <span class="f16"><strong class="cred">{{manufacturesTotalSalePrice}}元</strong>销售额</span>
                </p>
            </li>
        </ul>
        <!-- E 首页列表 -->
    </div>
</template>

<script>
    export default {
        name: 'MakeIndex',
        data () {
            return {
                result: '', // 结果数据
                currentDate: new Date(),
                manufacturesNum: '0',
                manufacturesStockNum: '0',
                manufacturesTotalPrice: '0',
                rawMaterialSkuNum: '0',
                manufacturesSaleNum: '0',
                manufacturesTotalSalePrice: '0',
            }
        },
        methods: {
            toMakeModifyPriceList: function () {
                this.$router.push({path: '/modifyPriceList'})
            },
            toMaterialList: function () {
                this.$router.push({path: '/materialList/'})
            }
        },
        mounted:function () {
            this.$emit('controLoading', true);
            this.$httpExt().post('index/getIndexInfo').then(response => {
                this.manufacturesNum = response.manufacturesNum
                this.manufacturesStockNum = response.manufacturesStockNum
                this.manufacturesTotalPrice = response.manufacturesTotalPrice
                this.rawMaterialSkuNum = response.rawMaterialSkuNum
                this.manufacturesSaleNum = response.manufacturesSaleNum
                this.manufacturesTotalSalePrice = response.manufacturesTotalSalePrice
            }, (response) => {
                this.$emit('showError', response.errorCode + ":" + response.errorMsg);
            }).then(response => {
                this.$emit('controLoading', false);
            })
        },
        filters: {
            //过滤时间
            formatDate:function (value) {
                // var date = new Date();
                var year = value.getFullYear()
                var month = value.getMonth()+1
                var day = value.getDate()
                return year + '年' + month + '月' + day + '日'
            }
        }
    }
</script>
