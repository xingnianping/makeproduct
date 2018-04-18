<template>
    <div>
        <div class="c64 top-bot position-relative">
            门店共有以下 <strong class="cblack">{{total}}款</strong> 商品已制作&nbsp;&nbsp;&nbsp;&nbsp;请参考建议售价，合理定价
            <st-button size="xxl" class="position-absolute product-header-btn-blue" @click="toMakeProductList">制作商品</st-button>
        </div>
        <!-- E 头部 -->

        <!-- S 制作商品列表 -->
        <ul class="product-list display-flex list-hover">
            <li v-for="item in result" :key="item.index">
                <img v-bind:src="item.productImageSmall" class="fl"/>
                <div class="fr product-info">
                    <h3 class="f16 c32 name">{{item.productName}}</h3>
                    <p class="f12 c64 text">建议售价：<strong class="f16">￥{{item.suggestPrice}}</strong></p>
                    <p class="f12 c64 text">当前售价：<strong class="cred f16">￥{{item.price}}</strong></p>
                    <p class="f12 c64 text">已有库存：<span class="f14">{{item.stockNum}}</span></p>
                </div>
                <div class="product-option">
                    <st-button type="text" size="xs" @click="showDialogModifyHistory(item)" class="fl">查看历史改价记录</st-button>
                    <st-button size="xs" @click="showDialogModifyPrice(item)" class="fr">修改价格</st-button>
                </div>
            </li>
        </ul>

        <st-pagenation :total="total" :size="pageSize" :currentPage="currentPage" v-if="showPage" @pagechange="pageChange"></st-pagenation>

        <!-- S 修改价格弹窗 -->
         <st-dialog title="修改价格" width="50%" :visible.sync="dialogModifyPrice" center @close="clearDialogModifyPrice">
            <p class="c96 make-instruction-text ">请参考商品的建议零售价，设置合理的销售价格。尽量不要降价超过建议价的20%。<br/>价格折扣，均以建议零售价为基准</p>
            <ul class="product-list display-flex ">
                <li>
                    <img v-bind:src="dialogModifyPriceDetail.productImageSmall" class="fl" style="margin-right: 20px;" />
                    <div class="">
                        <h3 class="f16 c32 name ">{{dialogModifyPriceDetail.productName}}</h3>
                        <p class="f12 c64 text ">建议售价：<strong class="cred f16 ">￥{{dialogModifyPriceDetail.suggestPrice}}</strong></p>
                        <p class="f12 c64 text ">已有库存：<span class="f14 ">{{dialogModifyPriceDetail.stockNum}}</span></p>
                    </div>
                </li>
            </ul>
            <p class="c64 f14 select-price-tips ">请选择商品价格折扣</p>
            <ul class="select-price clearfix">
                <li class="text-center f14 radius-4 c32" :class="{'current': discountPercent === 5}" @click="changePrice(.5)">5折</li>
                <li class="text-center f14 radius-4 c32" :class="{'current': discountPercent === 6}" @click="changePrice(.6)">6折</li>
                <li class="text-center f14 radius-4 c32" :class="{'current': discountPercent === 7}" @click="changePrice(.7)">7折</li>
                <li class="text-center f14 radius-4 c32" :class="{'current': discountPercent === 8}" @click="changePrice(.8)">8折</li>
                <li class="text-center f14 radius-4 c32" :class="{'current': discountPercent === 9}" @click="changePrice(.9)">9折</li>
                <li class="text-center f14 radius-4 c32" :class="{'current': discountPercent === 10}" @click="changePrice(1)">原价</li>
            </ul>
            <p class="text-center" v-if="!discountPrice == ''">
                <span class="f14 ">建议售价：<strong class="cred ">￥{{dialogModifyPriceDetail.suggestPrice}}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;折扣价：<strong class="cred">￥{{discountPrice}}</strong></span>
            </p>
            <span slot="footer" class="dialog-footer">
                <st-button size="m" @click="dialogModifyConfirm = true" :disabled="discountPrice === ''">确认改价</st-button>
            </span>
        </st-dialog>
        <!-- E 修改价格弹窗 -->

        <!-- S 确认价格弹窗 -->
        <st-dialog width="50%" :visible.sync="dialogModifyConfirm" v-model="dialogModifyPriceDetail" center>
            <h3 class="c32 f30 make-instruction-title">是否确认修改价格</h3>
            <p class="c96 make-instruction-text">确认修改后，将立即生效！请留意电子价签是否已经同步更新</p>
            <div class="text-center display-flex modify-price-wrap">
                <div class="c32 modify-price-box display-flex">
                    <div>
                        <p class="f16">原价</p>
                        <p class="f16"><strong>￥{{dialogModifyPriceDetail.suggestPrice}}</strong></p>
                    </div>
                </div>
                <div class="modify-price-arw display-flex">
                    <i class="icon-arw display-inlineblock"></i>
                </div>
                <div class="c32 f16 modify-price-box display-flex">
                    <div>
                        <p class="f16">修改后价格</p>
                        <p class="f16"><strong class="cred">￥{{discountPrice}}</strong></p>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <st-button size="m" type="gray" border @click="dialogModifyConfirm = false">返回调整</st-button>
                <st-button size="m" @click="ModifyConfirm(dialogModifyPriceDetail)">确认改价</st-button>
            </span>
        </st-dialog>
        <!-- E 确认价格弹窗 -->

        <!-- S 改价成功弹窗 -->
        <st-notification width="50%" :visible.sync="dialogModifySuccess" @close="refreshPage">
            <div class="pop-suc-box clearfix">
                <i class="fl icon-zcp-suc"></i>
                <div class="fl">
                    <p class="c32 f24">改价成功！</p>
                    <p class="c96 tips">商品价格已经生效！请留意电子价签是否已经同步更新</p>
                    <p class="c32 f16" style="padding-top:20px;">修改后价格&nbsp;<strong class="cred">￥{{discountPrice}}</strong></p>
                </div>
            </div>
        </st-notification>
        <!-- E 改价成功弹窗 -->


        <!-- S 改价历史记录查询 -->
        <st-dialog title="改价历史记录查询" width="50%" :visible.sync="dialogModifyHistory" center @close="clearDialogModifyHistoryClose">
            <p class="c96 make-instruction-text">仅可查询近1个月的记录，如需查询1个月以前的改价记录请联系总部运营同事</p>
            <ul class="product-list display-flex">
                <li>
                    <img v-bind:src="dialogModifyHistoryDetail.dialogModifyHistoryDetailContent.productImageSmall" class="fl" style="margin-right: 20px;"/>
                    <div>
                        <h3 class="f16 c32 name ">{{dialogModifyHistoryDetail.dialogModifyHistoryDetailContent.productName}}</h3>
                        <p class="f12 c64 text ">建议售价：<strong class="f16 ">￥{{dialogModifyHistoryDetail.dialogModifyHistoryDetailContent.suggestPrice}}</strong></p>
                        <p class="fr f12 c64 text" style="margin-top: -25px;">当前售价：<strong class="cred f16 ">￥{{dialogModifyHistoryDetail.dialogModifyHistoryDetailContent.price}}</strong></p>
                        <p class="f12 c64 text ">已有库存：<span class="f14 ">{{dialogModifyHistoryDetail.dialogModifyHistoryDetailContent.stockNum}}</span></p>
                    </div>
                </li>
            </ul>
            <!-- S  查看历史改价记录-->
            <div class="modify-price-record">
                <div class="timeline-wrap">
                    <div class="timeline-one" v-for="item in dialogModifyHistoryDetail.dialogModifyHistoryDetailList" :key="item.id" v-if="!dialogModifyHistoryDetail.dialogModifyHistoryDetailList == ''">
                        <p class="tit cred">¥{{item.price}}</p>
                        <p class="content">{{item.operator}}</p>
                        <p class="time">{{item.modifiedTime.split(' ')[0]}} <br/> {{item.modifiedTime.split(' ')[1]}}</p>
                        <span class="circle current"></span>
                    </div>
                </div>
                <p class="f16 text-center" v-if="dialogModifyHistoryDetail.dialogModifyHistoryDetailList == ''">近一个月暂无改价记录</p>
            </div>
            <!-- E 查看历史改价记录 -->
            <p class="c64 f12 select-price-tips text-center" v-if="dialogModifyHistoryDetail.dialogModifyHistoryDetailList.length > 5">温馨提示：可左右拖动查看早的改价记录哦~</p>
            <span slot="footer" class="dialog-footer">
                <st-button size="m" @click="dialogModifyHistory = false">确定</st-button>
            </span>
        </st-dialog>
        <!-- E 改价历史记录查询 -->

        <!-- S 没有可制作的商品 -->
        <div class="search-null text-center" v-if="isEmpty">
            <div class="img"><span class="icon"></span></div>
            <div class="text-center f14 c32">门店暂时没有可制作的商品</div>
        </div>
        <!-- S 没有可制作的商品 -->
    </div>
</template>

<style>
</style>

<script>
export default {
    data() {
        return {
            dialogModifyConfirm: false, // 改价历史确认弹窗
            dialogModifySuccess: false, // 改价成功弹窗
            dialogModifyHistory: false, // 改价历史弹窗
            dialogModifyPrice: false, // 改价弹窗
            result: '',
            dialogModifyHistoryDetail: {
                dialogModifyHistoryDetailContent: {},
                dialogModifyHistoryDetailList: {}
            },
            dialogModifyPriceDetail: {
            },
            price: '',
            discountPrice: '',
            discountPercent: '',
            isEmpty: false,

            // 分页
            showPage: false,
            total: 0,
            pageSize: 10,
            currentPage: 1,
        }
    },
    methods: {
        toMakeProductList: function () {
            this.$router.push({path: '/makeProductList'});
        },

        // 改价二次确认
        ModifyConfirm() {
            this.dialogModifyConfirm = false;
            this.dialogModifyPrice = false;
            this.dialogModifySuccess = true;
        },

        // 日期格式化
        formatDate(value) {
            var year = value.getFullYear();
            var month = value.getMonth()+1;
            var day = value.getDate();
            return year + '-' + month + '-' + day;
        },

        //查看改价历史弹窗
        showDialogModifyHistory(content) {
            var startDate = new Date();
            var endDate = new Date();
            startDate = startDate.setMonth(startDate.getMonth() - 1);
            startDate = new Date(startDate);
            startDate = this.formatDate(startDate);
            endDate = this.formatDate(endDate);
            let self = this;
            let param = {
                productSn: content.productSn,
                startTime: startDate,
                endTime: endDate
            };
            self.dialogModifyHistory = true;
            self.$httpExt().post('modifyPrice/getUpdatePriceHistoryList', param).then(response => {
                self.dialogModifyHistoryDetail.dialogModifyHistoryDetailList = response;
                self.dialogModifyHistoryDetail.dialogModifyHistoryDetailContent = content;
                console.log(response)
            }, (response) => {
                this.$emit('showError', response.errorCode + ":" + response.errorMsg);
            });
        },

        // 清空改价历史弹窗内容
        clearDialogModifyHistoryClose() {
            this.dialogModifyHistory = false;
            this.dialogModifyHistoryDetail.dialogModifyHistoryDetailContent = {};
            this.dialogModifyHistoryDetail.dialogModifyHistoryDetailList = {};
        },

        // 改价弹窗
        showDialogModifyPrice(content) {
            let self = this;
            self.dialogModifyPrice = true;
            self.dialogModifyPriceDetail = content;
            self.dialogModifyPriceDetail.productSn = content.productSn;
        },

        // 设置折扣
        changePrice(num) {
            this.discountPrice = (this.dialogModifyPriceDetail.suggestPrice * num).toFixed(2);
            this.discountPercent = num * 10;
        },

        // 清空折扣设置
        clearDialogModifyPrice() {
            this.discountPrice = '';
            this.discountPercent = '';
        },

        // 确认改价
        ModifyConfirm(value) {
            this.$emit('controLoading', true);
            let self = this;
            let param = {
                productSn: value.productSn,
                price: this.discountPrice,
                merchantSn: value.merchantSn,
                merchantName: value.merchantName
            };
            self.$httpExt().post('modifyPrice/updatePrice', param).then(response => {
                this.$emit('controLoading', false);
                this.dialogModifyConfirm = false;
                this.dialogModifyPrice = false;
                this.dialogModifySuccess = true;
            }, (response) => {
                this.$emit('showError', '改价失败!', response.errorMsg);
            });
        },

        // 跳转
        toPickList() {
            this.$router.push({path: '/materialList/pickList'});
        },

        // 改价后刷新页面
        refreshPage() {
            this.clearDialogModifyPrice();
            this.pageChange(this.currentPage);
        },

        pageChange (page) {
            this.currentPage = page;
            var param = {
                currentPage: this.currentPage,
                pageSize: 10
            }
            this.fetchData(param);
        },

        fetchData(param) {
            this.$emit('controLoading', true);
            this.$httpExt().post('modifyPrice/getChangeableList', param).then(response => {
                this.$emit('controLoading', false);
                this.result = response.data;
                this.total = response.totalRecord;
                this.pageSize = response.pageSize;
                if (this.total == 0) {
                  this.isEmpty = true;
                } else {
                  this.showPage = true;
                };
            }, (response) => {
                this.isEmpty = true;
                this.showPage = false;
                this.$emit('showError', response.errorCode + ":" + response.errorMsg);
            });
        }
    },
    mounted:function () {
        this.pageChange(1);
    }
};
</script>

<style scoped>
.product-option {
    left: 172px;
    right: 18px;
}
</style>
