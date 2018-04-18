<template>
    <div>
        <!-- S 头部 -->
        <div class="c64 top-bot position-relative">
            门店共有以下<strong class="cblack">{{total}}款</strong>原材料，请盘点每款原材料的实际剩余数量
            <st-button size="xxl" class="position-absolute product-header-btn-blue" @click="inventoryConfirm">
                确认盘点
            </st-button>
            <st-button size="xxl" type="plain" class="position-absolute product-header-btn-blue" @click="toInventoryHistoryList" style="right:192px;" border>
                历史盘点查询
            </st-button>
        </div>
        <!-- E 头部 -->

        <!-- S 原材料盘点列表 -->
        <div class="material-list">
            <div class="select-tz-wrap">
                <div class="mainlist-h clearfix">
                    <div class="mainlist-h1 c96" style="width:60%;"><span>套装商品</span></div>
                    <div class="mainlist-h2 c96 text-center" style="width:20%;"><span>原材料领取数量</span></div>
                    <div class="mainlist-h4 c96 text-center" style="width:20%;"><span>实际剩余数量</span></div>
                </div>
                <div v-for="item in result" :key="item.productId">
                    <div class="main-list main-list-space">
                        <div class="mainlist-con1 clearfix group-list border-r" style="width:60%;">
                            <div class="border-t clearfix list-info">
                                <img :src="item.productImageSmall" class="fl p-img">
                                <div class="fl p-info">
                                    <div class="p-name f14">
                                        {{item.productName}}
                                    </div>
                                    <div class="c96">
                                        商品编码 {{item.productSn}}
                                    </div>
                                    <div class="c96 mt8">
                                        <strong class="cred">￥{{(item.productPrice/100.0).toFixed(2)}}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mainlist-con3 c32 text-center" style="width:20%;">{{item.productNum}}</div>
                        <div class="mainlist-con4 text-center" style="width:20%;">
                            <div class="display-inlineblock">
                                <div class="ui-num clearfix fl text-center">
                                    <div class="fl">
                                        <st-input-number :obj="item" :min="0" :max="item.productNum" @change-number="onChangeNumber" :mintip="''" :maxtip="'已达到最大领取数量'" :parent-num="item.inventoryProductNum"></st-input-number>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- E 原材料盘点列表 -->

        <!--S 确认盘点弹窗 -->
        <st-dialog title="请确认原材料实际剩余数量" width="50%" :visible.sync="dialogInventoryConfirm" center>
            <p class="c96 make-instruction-text">请再次核实原材料剩余情况是否填写错误，并确认未使用的原材料是否可二次销售？<br/>未使用的原材料，将重新上架售卖。请搬运至货架。</p>
            <div class="select-tz-wrap">
                <div class="mainlist-h clearfix">
                    <div class="mainlist-h1 c96" style="width:60%;"><span>原材料名称</span></div>
                    <div class="mainlist-h2 c96 text-center" style="width:20%;"><span>原材料领取数量</span></div>
                    <div class="mainlist-h4 c96 text-center" style="width:20%;"><span>实际剩余数量</span></div>
                </div>
                <div v-for="item in confirmList" :key="item.productId">
                    <div class="main-list main-list-space">
                        <div class="mainlist-con1 clearfix group-list" style="width:60%; padding-left: 12px;">
                            <div class="border-t clearfix list-info">
                                <img :src="item.productImageThumb" class="fl p-img">
                                <div class="fl p-info">
                                    <div class="p-name f14">
                                        {{item.productName}}
                                    </div>
                                    <div class="c96">
                                        <strong class="cred">￥{{(item.productPrice/100.0).toFixed(2)}}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mainlist-con3 c32 text-center" style="width:20%;">{{item.productNum}}</div>
                        <div class="mainlist-con4 text-center" style="width:20%;">
                            {{item.inventoryProductNum}}
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <st-button type="gray" size="m" @click="dialogInventoryConfirm = false">返回调整</st-button>
                <st-button size="m" @click="confirmUpdate">确认盘点</st-button>
            </span>
        </st-dialog>
        <!--E 确认盘点弹窗 -->

        <!--S 成功弹窗 -->
        <st-notification width="45%" :visible.sync="dialogInventorySuccess" @close="toMaterialList">
            <div class="pop-suc-box clearfix">
                <i class="fl icon-zcp-suc"></i>
                <div class="fl">
                    <p class="c32 f24">原材料盘点成功！</p>
                    <p class="c96 tips">
                        原材料盘点记录已经生成，剩余未使用的原材料，将重新上架售卖。<br>请及时搬运至货架。上架还需制作制成品，请重新领取原材料。
                    </p>
                    <div class="c64 f16 save-text-box" style="padding-top:20px;">
                        <p class="clearfix"><span class="fl">盘点时间：{{$changeDateToString(getNowDate())}}</span></p>
                        <p>操作人：{{partnerInfo.userName}}</p>
                    </div>
                </div>
            </div>
        </st-notification>
        <!--E 成功弹窗 -->

        <!-- S 暂无数据 -->
        <div class="search-null text-center" v-if="isEmpty">
            <div class="img"><span class="icon"></span></div>
            <div class="text-center f14 c32">门店暂无可盘点原材料</div>
        </div>
        <!-- E 暂无数据 -->

    </div>
</template>

<style>
    .errorFrame{
        height:80px;
    }
    .errorTips{
        margin-top:40px;
        font:20px grey;
    }
</style>

<script>
    export default {
        data() {
            return {
                msg: '这个是原材盘点列表页',
                dialogInventoryConfirm: false,
                dialogInventorySuccess: false,
                currentPage: 1,
                pageSize: 10,
                total:0,
                result: {},
                confirmList: [],
                selectList: [],
                errorTitle:"错误提示",
                errorMsg:null,
                isEmpty:false
            }
        },
        props:[
            'partnerInfo'
        ],
        methods: {
            getNowDate () {
                return new Date().getTime() / 1000;
            },
            onChangeNumber (num, intf, object) {
                object.inventoryProductNum = num;
            },
            inventoryConfirm () {
                this.confirmList = this.$deepCopy(this.result);
                this.dialogInventoryConfirm = true
            },
            toInventoryHistoryList () {
                this.$router.push({path: '/materialList/InventoryHistoryList'});
            },
            confirmUpdate () {
                this.$httpExt().post("/materials/confirmInventory",{'jsonString':JSON.stringify(this.confirmList)}).then(response=> {
                    if (response) {
                        this.dialogInventoryConfirm = false;
                        this.dialogInventorySuccess = true;
                    }
                },response=> {
                    this.dialogInventoryConfirm = false;
                    this.$emit('showError', response.errorMsg);
                })

            },
            getData (param) {
                this.$emit('controLoading', true);
                if (!param) {
                    param = {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                    }
                }
                this.$httpExt().post("/materials/getUnConfirmInventoryList", param).then(response => {
                    this.$emit('controLoading', false);
                    this.result = response.data;
                    this.total = response.totalRecord;
                }, response => {
                    this.$emit('showError', response.errorCode + ":" + response.errorMsg);
                })
            },
            toMaterialList () {
                this.$router.push({path: '/materialList'});
            }
        },
        watch: {
            result (newVal,oldVal) {
                if (newVal!=null&&newVal.length>0) {
                    this.isEmpty = false;
                }else {
                    this.isEmpty = true;
                }

            }
        },
        mounted () {
            this.getData();
        }
    }
</script>
