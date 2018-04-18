<template>
    <div>
        <!-- S 头部 -->
        <div class="c64 top-bot position-relative">
            请根据实际制作情况填写制作数量，可分多次制作，多次填写&nbsp;&nbsp;&nbsp;&nbsp;请根据销售情况制作商品数量不要一次性制作太多，避免浪费
            <st-button size="xxl" class="position-absolute product-header-btn-blue" @click="confirmGrounding" :disabled="this.num==0">确定上架售卖</st-button>
        </div>
        <!-- E 头部 -->

        <!-- S 制作商品详情 -->
        <div class="product-list-wrap display-flex" v-if="initdata != null">
            <div class="product-list-detail">
                <i class="position-absolute tag-zcp">制成品</i>
                <img :src="initdata.productImageMiddle" class="fl img-s"/>
                <div class="fr product-info">
                    <h3 class="f16 c32 name">{{initdata.productName}}</h3>
                    <p class="f12 c64 text">建议售价：<strong class="cred f16">￥{{(initdata.suggestPrice).toFixed(2)}}</strong></p>
                    <p class="f12 c64 text">已有库存：<span class="f14">{{initdata.stockNum}}</span></p>
                </div>
            </div>
            <div class="product-list-num text-center display-flex">
                <div>
                    <p class="c32 f14 pb10">请输入本次实际制作的数量</p>
                    <div>
                        <st-input-number :min="0" :max="500" @change-number="onChangeNumber" :mintip="'请输入本次制作数量'" :maxtip="'已达到最大制作数量'" :parent-num="num" size="large"></st-input-number>
                    </div>
                </div>
            </div>
        </div>
        <!-- E 制作商品详情 -->

        <!-- S 商品制作记录 -->
        <div class="product-receive-record">
            <div class="rs-container">
                <div class="records">
                    <ul class="records timeAxis timeAxis-v">
                        <!--active-->
                        <li class="records-item timeAxis-item" v-for="item in orderList" :key="item.index">
                            <div class="timeAxis-item-c">
                                <div class="rs-item-c">
                                    <div class="clearfix">
                                        <!-- <span class="time fl c64">{{item.createTime | formatDate}}</span> -->
                                        <span class="time fl c64">{{$changeDateToString(item.createTime)}}</span>
                                        <div class="fl">
                                            <p class="c64 material-records-option">
                                                <span>操作人：{{item.operator}}</span>
                                                <span>制作了<strong class="c32">{{item.productNum}}款</strong>该商品</span><span>入库单号：{{item.orderSn}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- E 商品制作记录 -->

        <!-- S 暂无数据 -->
        <div class="search-null text-center" v-if="isEmpty">
            <div class="img"><span class="icon"></span></div>
            <div class="text-center f14 c32">门店暂无制作记录</div>
        </div>
        <!-- E 暂无数据 -->

        <!--S 成功弹窗 -->
        <st-notification width="40%" :visible.sync="dialogGroundingSuccess" @close="toMakeProduct">
            <div class="pop-suc-box clearfix">
                <i class="fl icon-zcp-suc"></i>
                <div class="fl">
                    <p class="c32 f24">上架成功！</p>
                    <p class="c96 tips">本次一共制作
                        <strong class="cblack">{{count}}份</strong>制成品
                    </p>
                </div>
            </div>
        </st-notification>
        <!--E 成功弹窗 -->

    </div>
</template>


<script>
    export default {
        data () {
            return {
                //上架成功弹窗
                dialogGroundingSuccess:false,
                result:'',
                initdata:null,
                num:1,
                count:0,
                orderList:[],
                isEmpty:false,
            }
        },
        methods: {
            //计数组件通信
            onChangeNumber(newValue) {
                this.num = newValue;
            },

            //制作历史列表
            getData (param) {
                this.$emit('controLoading', true);
                if (!param) {
                    param = {
                        productSn:this.initdata.productSn,
                    }
                }
                this.$httpExt().post('/makeProduct/getMakeOrderList', param).then(response => {
                    this.orderList = response;
                    this.$emit('controLoading', false);
                    if(this.orderList.length == 0){
                        this.isEmpty = true;
                    }
                }, (response) => {
                    this.isEmpty = true;
                    this.$emit('controLoading', false);
                    this.$emit("showError",response.errorCode + ":" + response.errorMsg);
                });
            },

            //确认上架
            confirmGrounding(param){
                this.$emit('controLoading', true);
                if(this.num <= 0){
                    this.minNumberTips = true;
                    return ;
                }
                else{
                     let param1 = {
                            'productSn':this.initdata.productSn,
                            'productId':this.initdata.productId,
                            'productName':this.initdata.productName,
                            'productStock':this.num,
                            'merchantSn':this.initdata.merchantSn,
                            'merchantName':this.initdata.merchantName,
                            'price':this.initdata.price
                    }
                    this.$httpExt().post('makeProduct/confirmMake', {'jsonParam':JSON.stringify(param1)}).then(response => {
                        this.$emit('controLoading', false);
                        this.count = this.num;
                        this.dialogGroundingSuccess = true;
                    }, (response) => {
                        this.$emit('controLoading', false);
                        this.$emit("showError","上架失败！",response.errorMsg);
                    });
                }
            },
            toMakeProduct(){
                this.$router.push({path:'/makeProductList'});
            },
        },
        mounted () {
            this.initdata = JSON.parse(this.$getCookie("item"));
            this.getData();
        },
        destroyed () {
            this.$removeCookie('item');
        },
        //时间格式化
        // filters: {
        //     formatDate: function (value) {
        //         var date = new Date(value*1000),
        //             year = date.getFullYear(),
        //             month = date.getMonth()+1,
        //             day = date.getDate(),
        //             hour = date.getHours(),
        //             minute = date.getMinutes();
        //         return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        //     }
        // }
    }
</script>
