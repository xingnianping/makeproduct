<template>
    <div>

        <!-- S 头部 -->
        <div class="c64 top-bot position-relative">
            门店共有以下 <strong class="cblack">{{total}} 款</strong>商品可以制作&nbsp;&nbsp;&nbsp;&nbsp;请按需制作，避免浪费
            <st-button size="xxl" class="position-absolute product-header-btn-blue"><router-link to="/modifyPriceList" class="cwhite nohover">查看已制作商品</router-link></st-button>
            <st-button type="plain" size="xxl" class="position-absolute product-header-btn-blue" style="right:192px;" border><router-link to="/materialList/pickList" class="c32 nohover">领取原材料</router-link></st-button>
        </div>
        <!-- E 头部 -->


         <!-- S 制作商品列表 -->
        <ul class="product-list display-flex" v-if="result.length != 0">
            <li v-for="item in result" :key="item.index">
                <img :src="item.productImageMiddle" class="fl img-m" />
                <div class="fr product-info">
                    <h3 class="f16 c32 name">{{item.productName}}</h3>
                    <p class="f12 c64 text">建议售价：<strong class="cred f16">￥{{(item.suggestPrice).toFixed(2)}}</strong></p>
                    <p class="f12 c64 text">已有库存：<span class="f14">{{item.stockNum}}</span></p>
                </div>
                <div class="product-option">
                    <st-button type="text" size="xs" @click="viewInstruction(item)">查看制作说明</st-button>
                    <st-button size="xs" @click="toMakeProductDetail(item)">制作该商品</st-button>
                </div>
            </li>
        </ul>
        <!-- E 制作商品列表 -->


        <!-- S 暂无数据 -->
        <div class="search-null text-center" v-if="isEmpty">
            <div class="img"><span class="icon"></span></div>
            <div class="text-center f14 c32">门店暂时没有可制作的商品</div>
        </div>
        <!-- S 暂无数据 -->


        <!-- S 制作说明弹窗 -->
        <st-dialog title="制作说明" width="50%" :visible.sync="dialogVisible" center>
            <p class="c96 make-instruction-text">请仔细阅读制作说明，按照说明制作制成品</p>
            <div class="product-list-pop-detail" v-if="dialogObj != ''">
                <p class="clearfix">
                    <span class="f16 c32 name text-ellipsis fl">{{dialogObj.productName}}</span>
                    <span class="c64 fl">建议售价：<strong class="cred f16">￥{{(dialogObj.suggestPrice).toFixed(2)}}</strong></span>
                </p>
                <div class="f14 c64 material-box clearfix">
                    <span class="fl">所需原材料：</span>
                    <div class="fl">
                        <p class="f14 material-name" v-html="replaceStr(dialogObj.materialProductName)"></p>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <st-button size="m" @click="dialogVisible = false">确 定</st-button>
            </span>
        </st-dialog>
        <!-- E 制作说明弹窗 -->

        <!-- S 分页 -->
        <template v-if="showPage">
            <st-pagenation :currentPage="currentPage" :size="pageSize" :total="total" @pagechange="pageChange"></st-pagenation>
        </template>
        <!-- E 分页 -->
    </div>
</template>

<style>
</style>
<script>
    export default {
        data () {
            return {
                //制作弹窗
                dialogVisible: false,
                currentPage:0,
                pageSize:10,
                total: 0,
                result:'',
                dialogObj:'',
                isLoading: false,
                isEmpty:false,
                showPage:false
            }
        },
        methods: {
            toMakeProductDetail(item) {
                this.$setCookie('item',JSON.stringify(item));
                this.$router.push({path:'/makeProductList/makeProductDetail'});
            },
            pageChange(page){
                this.currentPage = page;
                var param = {
                    currentPage:this.currentPage,
                    pageSize:this.pageSize
                }
                this.getData(param);
            },
            viewInstruction(item){
                this.dialogVisible = true;
                this.dialogObj = item;
            },
            replaceStr(str){
                if(str){
                     return str.replace(/\u3001/g,'<br/>');
                }
            },
            getData(param) {
                // this.isLoading = true;
                this.$emit('controLoading', true);
                this.$httpExt().post('/makeProduct/getMakableList', param).then(response => {
                    this.$emit('controLoading', false);
                    this.result = response.data;
                    this.currentPage = response.currentPage;
                    if(this.result.length == 0){
                        this.isEmpty = true;
                        this.showPage = false;
                    } else {
                        this.isEmpty = false;
                        this.showPage = true;
                    }
                    this.pageSize = response.pageSize;
                    this.total = response.totalRecord;
                }, (response) => {
                    this.isEmpty = true;
                    this.showPage = false;
                    this.$emit('controLoading', false);
                    this.$emit('showError', response.errorMsg);
                })
            }
        },
         mounted:function () {
            this.pageChange(1);
        }
    }
</script>
