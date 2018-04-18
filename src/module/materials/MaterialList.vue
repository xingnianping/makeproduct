<template>
    <div>
        <!-- S 头部 -->
        <div class="c64 top-bot position-relative">
            门店共领取了<strong class="cblack">{{result.totalRecord}}款</strong> 原材料&nbsp;&nbsp;&nbsp;&nbsp;
            <span><router-link to="/materialList/pickHistoryList">查看原材料领取记录<i
                    class="el-icon-arrow-right"></i></router-link></span>

            <st-button size="xxl" class="position-absolute product-header-btn-blue" @click="toPickList">
                领取原材料
            </st-button>
            <st-button size="xxl" type="plain" class="position-absolute product-header-btn-blue"
                       @click="toInventoryList" style="right:192px;" border>
                原材料盘点
            </st-button>
        </div>
        <!-- E 头部 -->

        <!-- S 商品列表 -->
        <div class="ui-plist clearfix">
            <ul>
                <li v-for="item in result.data" :key="item.index">
                    <div class="ui-pitem">
                        <div class="ui-pimg">
                            <img :src="item.productImageMiddle">
                        </div>
                        <div class="ui-pname f14">{{item.productName}}</a></div>
                        <div class="ui-pmoney">
                            <span class="ui-price"><strong class="cred">￥{{(item.productPrice/100.0).toFixed(0)}}.<small>{{(item.productPrice/100.0).toFixed(2).substring((item.productPrice/100.0).toFixed(2).indexOf('\.')+1)}}</small></strong></span>
                        </div>
                        <div class="ui-pinfo clearfix">
                            <span class="fl ui-num-txt c64">原材料领取数量</span>
                            <div class="ui-num clearfix fl text-center c32">
                                {{item.productNum}}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- E 商品列表 -->

        <!-- S 分页 -->
        <template v-if="showPage">
            <st-pagenation :currentPage="currentPage" :size="pageSize" :total="total"
                           @pagechange="pageChange"></st-pagenation>
        </template>
        <!-- E 分页-->

        <!-- S 暂无数据 -->
        <div class="search-null text-center" v-if="isEmpty">
            <div class="img"><span class="icon"></span></div>
            <div class="text-center f14 c32">门店暂无原材料，请根据实际需要领取原材料</div>
            <div class="tips c64">
                <router-link to="/materialList/pickHistoryList">查看历史领取记录<i class="el-icon-arrow-right"></i>
                </router-link>
            </div>
            <div class="button-box">
                <st-button size="xs" @click="toPickList">去领取原材料</st-button>
            </div>
        </div>
        <!-- E 暂无数据 -->
    </div>
</template>

<style>

</style>

<script>
    export default {
        data () {
            return {
                msg: '领取原材料',
                result: {
                    data: null
                }, // 结果数据
                currentPage: 1, // 当前页
                pageSize: 10, // 当页显示条数
                total: 0,
                isEmpty: false,
                showPage: false
            }
        },
        methods: {
            toInventoryList() {
                this.$router.push({path: '/materialList/inventoryList'});
            },
            toPickList() {
                this.$router.push({path: '/materialList/pickList'});
            },
            pageChange(current) {
                this.$emit('controLoading', true);
                this.currentPage = current;
                var param = {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                };
                this.$httpExt().post('materials/getPickedList', param).then(response => {
                    this.result = response;
                    this.pageSize = response.pageSize;
                    this.total = response.totalRecord;
                },response => {
                    this.$emit('showError', response.errorCode + ":" + response.errorMsg);
                }).then(response => {
                    this.$emit('controLoading', false);
                });
            }
        },
        watch:{
            result (newVal, oldVal) {
                if (newVal!=null&&newVal.data.length>0) {
                    this.isEmpty = false;
                    this.showPage = true;
                }else {
                    this.isEmpty = true;
                    this.showPage = false;
                }
            }
        },
        mounted: function () {
            this.pageChange(1);
        }
    }
</script>
