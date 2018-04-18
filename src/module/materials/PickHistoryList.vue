<template>
    <div>
        <!-- S 头部 -->
        <div class="c64 top-bot position-relative">
            历史原材料领取记录如下
            <div class="fr">
                <div class="fl mr12" style="margin-top: 3px;">
                    <el-date-picker
                            v-model="dateVal"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            style="width: 240px;"
                            @change="datePickRange"
                    >
                    </el-date-picker>
                </div>
                <div class="fl mr12">
                    <st-input placeholder="输入操作人工号" v-model="operatorNum"/>
                </div>
                <div class="fl">
                    <st-button slot="append" class="st-button" type="ss" @click="searchRecording">查询</st-button>
                </div>
            </div>
        </div>
        <!-- E 头部 -->

        <!-- S 记录列表v -->
        <div class="rs-container">
            <div class="records">
                <ul class="records timeAxis timeAxis-v">
                    <li class="records-item timeAxis-item" :class="{active:selectNum==index}" v-for="(item,index) in result" :key="item.index" @click="selectNum=index">
                        <div class="timeAxis-item-c">
                            <div class="rs-item-c">
                                <div>
                                    <p class="c64">
                                        <span>{{$changeDateToString(item.createTime)}}</span>
                                        <span class="fr"><st-button type="text" @click="toDetail(item.orderSn)">查看详情<i class="el-icon-arrow-right"></i></st-button></span>
                                    </p>
                                    <p class="c64 material-records-option">
                                        <span>操作人：{{item.operator}}</span>
                                        <span>领取了<strong class="c32">{{item.skuNum}}款</strong>原材料</span><span>领取单号：{{item.orderSn}}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- E 记录列表v -->

        <!-- S 分页 -->
        <template v-if="showPage">
            <st-pagenation :currentPage="currentPage" :size="pageSize" :total="total" @pagechange="pageChange"></st-pagenation>
        </template>
        <!-- E 分页-->

        <!-- S 暂无数据-->
        <div class="search-null text-center" v-if="isEmpty">
            <div class="img"><span class="icon"></span></div>
            <div class="text-center f14 c32">门店暂无领取记录</div>
        </div>
        <!-- E 暂无数据-->

    </div>
</template>

<style>
</style>

<script>
    export default {
        data () {
            return {
                msg: '这个是原材料领取记录列表页',
                total:0,
                currentPage: 1,
                pageSize: 10,
                result:null,
                operatorNum:null,
                selectNum:0,
                dateVal:[new Date(new Date(new Date(new Date() - 1000 * 60 * 60 * 24 * 30).toLocaleDateString()).getTime()), new Date(new Date().toLocaleDateString())],
                isEmpty:false,
                showPage:false,
            }
        },
        methods: {
            toDetail (orderSn) {
                this.$router.push({path: '/materialList/pickHistoryList/pickHistoryDetail',query: {orderSn: orderSn}});
            },
            searchRecording () {
                this.pageChange(1)
            },
            pageChange(page) {
                this.$emit('controLoading', true);
                this.currentPage = page;
                if (this.dateVal==null||this.dateVal=="") {
                    this.$emit('showError', "请选择时间范围！");
                    return;
                }
                var param = {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                    createTimeBegin: parseInt(this.dateVal[0].getTime() / 1000),
                    createTimeEnd: parseInt((this.dateVal[1].getTime() + 24 * 60 * 60 * 1000-1) / 1000),
                };
                console.log(new Date());
                if (this.operatorNum) {
                    param["operator"]=this.operatorNum
                }
                this.getData(param);

            },
            datePickRange() {
                const start = this.dateVal[0];
                const end = new Date(this.dateVal[1].getTime() + 24 * 60 * 60 * 1000-1);
                const days = parseInt(Math.abs(end - start) / 1000 / 60 / 60 / 24);
                if (days > 30) {
                    this.$emit('showError', "查询时间跨度不可超过30天！");
                    this.dateVal = [new Date(new Date(new Date(new Date() - 1000 * 60 * 60 * 24 * 30).toLocaleDateString()).getTime()), new Date(new Date().toLocaleDateString())];
                }
            },
            getData (param) {
                this.$httpExt().post('materials/getPickHistoryList', param).then(response => {
                    this.result = response.data;
                    this.pageSize = response.pageSize;
                    this.total = response.totalRecord;
                }, (response) => {
                    this.$emit('showError', response.errorCode + ":" + response.errorMsg);
                }).then(response => {
                    this.$emit('controLoading', false);
                    this.initData();
                })
            },
            initData () {
                this.selectNum = 0;
            },
        },
        watch:{
            result (newVal,oldVal) {
                if (newVal!=null&&newVal.length>0) {
                    this.isEmpty = false;
                    this.showPage = true;
                }else {
                    this.isEmpty = true;
                    this.showPage = false;
                }
            }
        },
        mounted () {
            this.pageChange(1);
        }
    }
</script>
