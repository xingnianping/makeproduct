<template>
    <div>
        <!-- S 记录列表v -->
        <div class="material-receive-record" v-if="result!=null">
            <div class="mb12 ui-table-order mt12">
                <div class="ui-table-h ui-table-gray clearfix material-receive-tablehead c64">
                    <span>{{$changeDateToString(result.createTime)}}</span>
                    <span>领取了以下<strong class="c32">{{result.skuNum}}款</strong>原材料</span>
                    <span>领取单号：{{result.orderSn}}</span>
                    <span>操作人：{{result.operator}}</span>
                </div>
                <!-- S 表头 -->
                <div class="ui-table border-t bg-white">
                    <div class="mainlist-con clearfix">
                        <div class="clearfix mainlist-con1" style="width:55%;">
                            <div class="fl make-p-info">
                                <span class="make-p-name c96">商品名称</span>
                            </div>
                        </div>
                        <div class="mainlist-con2 c96 text-center" style="width:15%;"><span>商品编码</span></div>
                        <div class="mainlist-con3 c96 text-center" style="width:15%;">价格</div>
                        <div class="mainlist-con4 c96 text-center" style="width:15%;">领取数量</div>
                    </div>
                </div>
                <!-- E 表头 -->
                <!-- S 循环内容 -->
                <div class="ui-table border-t bg-white" v-for="item in result.productList" :key="item.index">
                    <div class="mainlist-con clearfix">
                        <div class="clearfix mainlist-con1" style="width:55%;">
                            <div class="fl make-p-info">
                                <span class="make-p-name f14 c32">{{item.productName}}</span>
                            </div>
                        </div>
                        <div class="mainlist-con2 c64 text-center" style="width:15%;">{{item.productSn}}</div>
                        <div class="mainlist-con3 c64 text-center" style="width:15%;"><strong
                                class="cred">￥{{(item.productPrice/1.0).toFixed(2)}}</strong></div>
                        <div class="mainlist-con4 c64 text-center" style="width:15%;">
                            <strong>{{item.productStock}}</strong></div>
                    </div>
                </div>
                <!-- E 循环内容 -->
            </div>
        </div>
        <!-- E 记录列表v -->
    </div>
</template>

<style>
</style>

<script>
    export default{
        data () {
            return {
                msg: '这个是原材料领取记录详情页',
                result: null,
            }
        },
        methods: {
            getData (param) {
                this.$emit('controLoading', true);
                if (!param) {
                    param = {
                        pickOrderSn: this.$route.query.orderSn
                    }
                }
                this.$httpExt().post("/materials/getPickHistoryDetail", param).then(response => {
                    this.$emit('controLoading', false);
                    this.result = response;
                }, response => {
                    this.$emit('showError', response.errorCode + ":" + response.errorMsg);
                });
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>
