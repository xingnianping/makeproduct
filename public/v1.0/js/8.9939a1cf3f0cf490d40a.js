webpackJsonp([8],{R7J5:function(t,i){},dKOn:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=s("3cXf"),n=s.n(a),e={data:function(){return{msg:"这个是原材盘点列表页",dialogInventoryConfirm:!1,dialogInventorySuccess:!1,currentPage:1,pageSize:10,total:0,result:{},confirmList:[],selectList:[],errorTitle:"错误提示",errorMsg:null,isEmpty:!1}},props:["partnerInfo"],methods:{getNowDate:function(){return(new Date).getTime()/1e3},onChangeNumber:function(t,i,s){s.inventoryProductNum=t},inventoryConfirm:function(){this.confirmList=this.$deepCopy(this.result),this.dialogInventoryConfirm=!0},toInventoryHistoryList:function(){this.$router.push({path:"/materialList/InventoryHistoryList"})},confirmUpdate:function(){var t=this;this.$httpExt().post("/materials/confirmInventory",{jsonString:n()(this.confirmList)}).then(function(i){i&&(t.dialogInventoryConfirm=!1,t.dialogInventorySuccess=!0)},function(i){t.dialogInventoryConfirm=!1,t.$emit("showError",i.errorMsg)})},getData:function(t){var i=this;this.$emit("controLoading",!0),t||(t={currentPage:this.currentPage,pageSize:this.pageSize}),this.$httpExt().post("/materials/getUnConfirmInventoryList",t).then(function(t){i.$emit("controLoading",!1),i.result=t.data,i.total=t.totalRecord},function(t){i.$emit("showError",t.errorCode+":"+t.errorMsg)})},toMaterialList:function(){this.$router.push({path:"/materialList"})}},watch:{result:function(t,i){null!=t&&t.length>0?this.isEmpty=!1:this.isEmpty=!0}},mounted:function(){this.getData()}},c={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",[s("div",{staticClass:"c64 top-bot position-relative"},[t._v("\n        门店共有以下"),s("strong",{staticClass:"cblack"},[t._v(t._s(t.total)+"款")]),t._v("原材料，请盘点每款原材料的实际剩余数量\n        "),s("st-button",{staticClass:"position-absolute product-header-btn-blue",attrs:{size:"xxl"},on:{click:t.inventoryConfirm}},[t._v("\n            确认盘点\n        ")]),t._v(" "),s("st-button",{staticClass:"position-absolute product-header-btn-blue",staticStyle:{right:"192px"},attrs:{size:"xxl",type:"plain",border:""},on:{click:t.toInventoryHistoryList}},[t._v("\n            历史盘点查询\n        ")])],1),t._v(" "),s("div",{staticClass:"material-list"},[s("div",{staticClass:"select-tz-wrap"},[t._m(0),t._v(" "),t._l(t.result,function(i){return s("div",{key:i.productId},[s("div",{staticClass:"main-list main-list-space"},[s("div",{staticClass:"mainlist-con1 clearfix group-list border-r",staticStyle:{width:"60%"}},[s("div",{staticClass:"border-t clearfix list-info"},[s("img",{staticClass:"fl p-img",attrs:{src:i.productImageSmall}}),t._v(" "),s("div",{staticClass:"fl p-info"},[s("div",{staticClass:"p-name f14"},[t._v("\n                                    "+t._s(i.productName)+"\n                                ")]),t._v(" "),s("div",{staticClass:"c96"},[t._v("\n                                    商品编码 "+t._s(i.productSn)+"\n                                ")]),t._v(" "),s("div",{staticClass:"c96 mt8"},[s("strong",{staticClass:"cred"},[t._v("￥"+t._s((i.productPrice/100).toFixed(2)))])])])])]),t._v(" "),s("div",{staticClass:"mainlist-con3 c32 text-center",staticStyle:{width:"20%"}},[t._v(t._s(i.productNum))]),t._v(" "),s("div",{staticClass:"mainlist-con4 text-center",staticStyle:{width:"20%"}},[s("div",{staticClass:"display-inlineblock"},[s("div",{staticClass:"ui-num clearfix fl text-center"},[s("div",{staticClass:"fl"},[s("st-input-number",{attrs:{obj:i,min:0,max:i.productNum,mintip:"",maxtip:"已达到最大领取数量","parent-num":i.inventoryProductNum},on:{"change-number":t.onChangeNumber}})],1)])])])])])})],2)]),t._v(" "),s("st-dialog",{attrs:{title:"请确认原材料实际剩余数量",width:"50%",visible:t.dialogInventoryConfirm,center:""},on:{"update:visible":function(i){t.dialogInventoryConfirm=i}}},[s("p",{staticClass:"c96 make-instruction-text"},[t._v("请再次核实原材料剩余情况是否填写错误，并确认未使用的原材料是否可二次销售？"),s("br"),t._v("未使用的原材料，将重新上架售卖。请搬运至货架。")]),t._v(" "),s("div",{staticClass:"select-tz-wrap"},[s("div",{staticClass:"mainlist-h clearfix"},[s("div",{staticClass:"mainlist-h1 c96",staticStyle:{width:"60%"}},[s("span",[t._v("原材料名称")])]),t._v(" "),s("div",{staticClass:"mainlist-h2 c96 text-center",staticStyle:{width:"20%"}},[s("span",[t._v("原材料领取数量")])]),t._v(" "),s("div",{staticClass:"mainlist-h4 c96 text-center",staticStyle:{width:"20%"}},[s("span",[t._v("实际剩余数量")])])]),t._v(" "),t._l(t.confirmList,function(i){return s("div",{key:i.productId},[s("div",{staticClass:"main-list main-list-space"},[s("div",{staticClass:"mainlist-con1 clearfix group-list",staticStyle:{width:"60%","padding-left":"12px"}},[s("div",{staticClass:"border-t clearfix list-info"},[s("img",{staticClass:"fl p-img",attrs:{src:i.productImageThumb}}),t._v(" "),s("div",{staticClass:"fl p-info"},[s("div",{staticClass:"p-name f14"},[t._v("\n                                    "+t._s(i.productName)+"\n                                ")]),t._v(" "),s("div",{staticClass:"c96"},[s("strong",{staticClass:"cred"},[t._v("￥"+t._s((i.productPrice/100).toFixed(2)))])])])])]),t._v(" "),s("div",{staticClass:"mainlist-con3 c32 text-center",staticStyle:{width:"20%"}},[t._v(t._s(i.productNum))]),t._v(" "),s("div",{staticClass:"mainlist-con4 text-center",staticStyle:{width:"20%"}},[t._v("\n                        "+t._s(i.inventoryProductNum)+"\n                    ")])])])})],2),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("st-button",{attrs:{type:"gray",size:"m"},on:{click:function(i){t.dialogInventoryConfirm=!1}}},[t._v("返回调整")]),t._v(" "),s("st-button",{attrs:{size:"m"},on:{click:t.confirmUpdate}},[t._v("确认盘点")])],1)]),t._v(" "),s("st-notification",{attrs:{width:"45%",visible:t.dialogInventorySuccess},on:{"update:visible":function(i){t.dialogInventorySuccess=i},close:t.toMaterialList}},[s("div",{staticClass:"pop-suc-box clearfix"},[s("i",{staticClass:"fl icon-zcp-suc"}),t._v(" "),s("div",{staticClass:"fl"},[s("p",{staticClass:"c32 f24"},[t._v("原材料盘点成功！")]),t._v(" "),s("p",{staticClass:"c96 tips"},[t._v("\n                    原材料盘点记录已经生成，剩余未使用的原材料，将重新上架售卖。"),s("br"),t._v("请及时搬运至货架。上架还需制作制成品，请重新领取原材料。\n                ")]),t._v(" "),s("div",{staticClass:"c64 f16 save-text-box",staticStyle:{"padding-top":"20px"}},[s("p",{staticClass:"clearfix"},[s("span",{staticClass:"fl"},[t._v("盘点时间："+t._s(t.$changeDateToString(t.getNowDate())))])]),t._v(" "),s("p",[t._v("操作人："+t._s(t.partnerInfo.userName))])])])])]),t._v(" "),t.isEmpty?s("div",{staticClass:"search-null text-center"},[t._m(1),t._v(" "),s("div",{staticClass:"text-center f14 c32"},[t._v("门店暂无可盘点原材料")])]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"mainlist-h clearfix"},[i("div",{staticClass:"mainlist-h1 c96",staticStyle:{width:"60%"}},[i("span",[this._v("套装商品")])]),this._v(" "),i("div",{staticClass:"mainlist-h2 c96 text-center",staticStyle:{width:"20%"}},[i("span",[this._v("原材料领取数量")])]),this._v(" "),i("div",{staticClass:"mainlist-h4 c96 text-center",staticStyle:{width:"20%"}},[i("span",[this._v("实际剩余数量")])])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"img"},[i("span",{staticClass:"icon"})])}]};var r=s("Z0/y")(e,c,!1,function(t){s("R7J5")},null,null);i.default=r.exports}});