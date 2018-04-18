<template>
    <div>
        <!-- S 头部 -->
        <div class="c64 top-bot position-relative">

            门店共有以下<strong class="cblack">{{total}}款</strong> 商品可以作为原材料领取并制作商品&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="position-absolute header-search-wrap">
                <st-input placeholder="可输入商品编码/名称进行查询" style="width: 300px;" v-model="searchMsg" >
                    <st-button slot="append" class="st-button" type="ss" @click="searchPro(1)">查询</st-button>
                </st-input>
            </div>
            <st-button size="xxl" class="position-absolute product-header-btn-blue" @click="pickConfirm">{{ turnStyleNum(pickSelect.length) }}确认领取</st-button>
        </div>
        <!-- E 头部 -->


        <!-- S 领取原材料 -->
        <div class="ui-plist clearfix">
            <ul v-if="result!=null">
                <li :class="{'selected':JSON.stringify(pickSelect).indexOf(JSON.stringify(item))!=-1}" v-for="item in result.data" :key="item.index">
                    <div class="ui-pitem">
                        <div class="ui-pimg" @click="pickProduct(item,1)">
                            <img :src="item.productImageMiddle">
                        </div>
                        <div class="ui-pname f14" @click="pickProduct(item,1)">{{item.productName}}</div>
                        <div class="ui-pmoney" @click="pickProduct(item,1)">
                            <span class="ui-price"><strong class="cred">￥{{(item.productPrice/100.0).toFixed(0)}}.<small>{{(item.productPrice/100.0).toFixed(2).substring((item.productPrice/100.0).toFixed(2).indexOf('\.')+1)}}</small></strong></span>
                            <p class="f12 c96">商品编码：{{ item.productSn }}</p>
                        </div>
                        <div class="ui-num-box clearfix ">
                            <span class="fl ui-num-txt c64">领取数量</span>
                            <div class="ui-num clearfix fl text-center">
                                <div class="fl">
                                    <st-input-number :obj="item" :min="1" :max="item.productStock" @change-number="onChangeNumber" :mintip="''" :maxtip="'已达到最大库存数量'" :parent-num="item.productNum" direction="up"></st-input-number>
                                </div>
                            </div>
                        </div>
                        <div class="ui-pinfo clearfix" @click="pickProduct(item,1)">
                            <span class="fl ui-num-txt c64">门店库存</span>
                            <div class="ui-num clearfix fl text-center c32">
                                {{item.productStock}}
                            </div>
                        </div>
                    </div>
                    <div class="mask" v-if="0 == item.productStock"></div>
                </li>
            </ul>
        </div>

        <!-- E 领取原材料列表 -->

        <!-- S 分页 -->
        <template v-if="showPage">
            <st-pagenation :currentPage="currentPage" :size="pageSize" :total="total" @pagechange="pageChange"></st-pagenation>
        </template>
        <!-- E 分页-->

        <!--S 确认领取弹窗 -->
        <st-dialog title="确认领取以下原材料吗？" width="50%" :visible.sync="dialogPickConfirm" center>
            <p class="c96 make-instruction-text">请按需选择，拒绝浪费，确认选择后原材料将从门店库存扣除</p>
            <div class="select-tz-wrap">
                <div class="mainlist-h clearfix">
                    <div class="mainlist-h1 c96" style="width:60%;"><span>原材料名称</span></div>
                    <div class="mainlist-h2 c96 text-center" style="width:20%;"><span>门店在售库存</span></div>
                    <div class="mainlist-h4 c96 text-center" style="width:20%;"><span>需领取数量</span></div>
                </div>
                <div v-for="item in pickSelect" :key="item.index">
                    <div class="main-list main-list-space">
                        <i class="table-select position-absolute" :class="{'selected':JSON.stringify(submitProduct).indexOf(JSON.stringify(item.productId))!=-1}" ></i>
                        <div class="mainlist-con1 clearfix group-list" style="width:60%;" @click="pickProduct(item,2)">
                            <div class="border-t clearfix list-info">
                                <img :src="item.productImageMiddle" class="fl p-img">
                                <div class="fl p-info">
                                    <div class="p-name f14">{{item.productName}}</div>
                                    <div class="c96">
                                        <strong class="cred">￥{{(item.productPrice/100).toFixed(2)}}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mainlist-con3 c32 text-center" style="width:20%;">{{item.productStock}}</div>
                        <div class="mainlist-con4 text-center" style="width:20%;">
                            <div class="display-inlineblock">
                                <div class="ui-num clearfix fl text-center">
                                    <div class="fl">
                                        <st-input-number :obj="item" :min="1" :max="item.productStock" @change-number="onChangeNumber" :mintip="''" :maxtip="'已达到最大库存数量'" :parent-num="item.productNum" direction="down"></st-input-number>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
                <st-button size="m" @click="submitConfirm">确认领取</st-button>
            </span>
        </st-dialog>
        <!--E 确认领取弹窗 -->

        <!-- S 成功 -->
        <st-notification width="40%" :visible.sync="dialogPickSuccess" @close="toMaterialList">
            <div class="pop-suc-box clearfix">
                <i class="fl icon-zcp-suc"></i>
                <div class="fl">
                    <p class="c32 f24">原材料领取成功！</p>
                    <p class="c96 tips">
                        原材料领取记录已经生成，领取的原材料将从门店库存中扣除。<br/> 请及时从货架上将已经领取的原材料，搬运到制作区域。
                    </p>
                    <div class="c64 f16 save-text-box" style="padding-top:20px;">
                        <p class="clearfix">
                            <span class="fl">领取总数量：{{totalPick}}件</span>
                            <span class="fr save-text-right" v-if="partnerInfo!=null">操作人：{{partnerInfo.userCode}}</span>
                        </p>
                        <p>领取时间：{{$changeDateToString(new Date().getTime()/1000)}}</p>
                    </div>
                </div>
            </div>
        </st-notification>
        <!-- E 成功 -->


        <!-- S 暂无数据 -->
        <div class="search-null text-center" v-if="isEmpty">
            <div class="img"><span class="icon"></span></div>
            <div class="text-center f14 c32">门店暂无可领取原材料</div>
        </div>
        <!-- E 暂无数据 -->
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: '这个是领取原材料列表页',
                currentPage:1,
                pageSize:10,
                total:0,
                totalPick:0,
                dialogPickConfirm: false,//确认弹层
                dialogPickSuccess: false,//成功弹层
                //dialogPickFalse: false,//失败弹层
                searchMsg:null,//查询参数
                result:null,//结果数据
                pickSelect:[],//页面选中的商品
                submitProduct:[],//确认框选中商品
                isEmpty:false,
                showPage:false
            }
        },
        methods: {
            turnStyleNum(val) {
                return val == 0 ? '' : val;
            },
            toMaterialList () {
                this.$router.push({path: '/materialList'});
            },
            clearSelectProduct () {
                this.pickSelect = [];
                this.submitProduct = [];
            },
            searchPro (page) {
                this.$emit('controLoading', true);
                if (page) {
                    this.currentPage = page == 1 ? page : this.currentPage;
                    this.clearSelectProduct();
                }
                var param = {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                };
                var reg = /^[0-9]*$/;
                if (null != this.searchMsg && '' != this.searchMsg) {
                    reg.test(this.searchMsg) ? param["productSn"] = this.searchMsg : param["productName"] = this.searchMsg;
                }
                this.getData(param);
            },
            pickProduct (product,type) {//添加选中商品到数组中 type 1:操作页面选中数组 2:操作确认领取弹框数组
                product.productNum = product.productNum == 0 ? 1 : product.productNum;
                let proArr = type == 1 ? this.pickSelect : this.submitProduct;
                if (JSON.stringify(proArr).indexOf(JSON.stringify(product))!=-1) {
                    for (var i = 0;i<=proArr.length;i++) {
                        if (proArr[i].productId==product.productId) {
                            proArr.splice(i, 1);
                            return false;
                        }
                    }
                }else {
                    proArr.push(product);
                }
                type==1?this.pickSelect = proArr:this.submitProduct = proArr;
            },
            pickConfirm () {//第一次确认领取
                if (this.pickSelect.length==0) {
                    this.$emit("showError","请选择需要领取的商品！");
                    return;
                }else {
                  this.submitProduct = this.$deepCopy(this.pickSelect);
                  this.dialogPickConfirm = true
                }
            },
            submitConfirm () {//第二次确认领取
                this.$emit('controLoading', true);
                if (this.submitProduct.length==0) {
                    this.$emit("showError","请至少选择一样商品！");
                    return;
                }
                var param = [];
                var stringify2 = JSON.stringify(this.submitProduct);
                for(var i = 0; i < this.pickSelect.length; i ++) {
                    if (stringify2.indexOf(this.pickSelect[i].productSn)!=-1) {
                        this.totalPick += this.pickSelect[i].productNum;
                        param.push(this.pickSelect[i]);
                    }

                }
                let stringify = {'jsonString': JSON.stringify(param)};
                this.confirmPick(stringify);
            },
            onChangeNumber (num, intf, object) {
                object.productNum = num;
            },
            pageChange (page) {
                this.currentPage = page;
                this.searchPro();
            },
            getData (param) {
                this.$httpExt().post('materials/getUsableList', param).then(response => {
                    this.result = response;
                    this.total = response.totalRecord;
                }, (response) => {
                    this.$emit("showError",response.errorCode + ":" + response.errorMsg);
                }).then(response => {
                    this.$emit('controLoading', false);
                })
            },
            confirmPick (param) {//确认领取请求数据
                this.$httpExt().post('materials/confirmPick',param).then(response => {
                    this.dialogPickConfirm = false;
                    this.dialogPickSuccess = true;
                }, (response) => {
                    this.dialogPickConfirm = false;
                    this.$emit("showError","领取原材料失败",response.errorCode + ":" + response.errorMsg);
                }).then(response => {
                    this.$emit('controLoading', false);
                    this.clearSelectProduct();
                })
            },
        },
        watch: {
            result (newVal,oldVal) {
                if (newVal!=null&&newVal.data.length>0) {
                    this.isEmpty = false;
                    this.showPage = true;
                }else {
                    this.isEmpty = true;
                    this.showPage = false;
                }
            }
        },
        props:[
            'partnerInfo'
        ],
        mounted () {
            this.pageChange(1);
        }
    }
</script>

<style scoped>
.ui-plist ul li .mask {
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    cursor: not-allowed;
}
</style>

