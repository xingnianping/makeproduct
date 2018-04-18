<template>
    <div>
        <!-- S 记录列表v -->
        <div class="material-receive-record" v-if="result!=null">
            <div class="mb12 ui-table-order mt12">
                <div class="ui-table-h ui-table-gray clearfix material-receive-tablehead c64">
                    <span>{{ $changeDateToString(result.createTime) }}</span>
                    <span>操作人：{{result.operator}}</span>
                    <span>累计领取原材料数量：<strong class="c32">{{ result.productNum }}</strong></span>
                    <span>实际使用数量：<strong class="c32">{{ result.actualUseNum }}</strong></span>
                    <span>盘点单号：{{ result.orderSn }}</span>
                </div>
                <!-- S 表头 -->
                <div class="ui-table border-t bg-white">
                    <div class="mainlist-con clearfix">
                        <div class="clearfix mainlist-con1" style="width:40%;">
                            <div class="fl make-p-info">
                                <span class="make-p-name c96">商品名称</span>
                            </div>
                        </div>
                        <div class="mainlist-con2 c96 text-center" style="width:15%;"><span>商品编码</span></div>
                        <div class="mainlist-con3 c96 text-center" style="width:15%;">价格</div>
                        <div class="mainlist-con4 c96 text-center" style="width:15%;">领取数量</div>
                        <div class="mainlist-con5 c96 text-center" style="width:15%;">实际使用数量</div>
                    </div>
                </div>
                <!-- E 表头 -->
                <!-- S 循环内容 -->
                <div class="ui-table border-t bg-white" v-for="(item,index) in result.productList" :key="index">
                    <div class="mainlist-con clearfix">
                        <div class="clearfix mainlist-con1" style="width:40%;">
                            <div class="fl make-p-info">
                                <span class="make-p-name f14 c32">{{item.productName}}</span>
                            </div>
                        </div>
                        <div class="mainlist-con2 c64 text-center" style="width:15%;">{{item.productSn}}</div>
                        <div class="mainlist-con3 c64 text-center" style="width:15%;"><strong class="cred">￥{{(item.productPrice/1.0).toFixed(2)}}</strong></div>
                        <div class="mainlist-con4 c64 text-center" style="width:15%;"><strong>{{item.productNum}}</strong></div>
                        <div class="mainlist-con5 c64 text-center" style="width:15%;"><strong>{{ item.actualUseNum }}</strong></div>
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
                msg: '这个是历史盘点详情页',
                result:null,
            }
        },
        methods:{
            getData (param) {
                this.$emit('controLoading', true);
                if (!param) {
                    param = {
                        inventoryOrderSn:this.$route.query.orderSn
                    }
                }
                this.$httpExt().post("/materials/getInventoryHistoryDetail", param).then(response =>{
                    this.result = response;
                    this.$emit('controLoading', false);
                },response => {
                    this.$emit('showError', response.errorCode + ":" + response.errorMsg);
                })
            }
        },
        mounted () {
            this.getData();
        },
    }
</script>
