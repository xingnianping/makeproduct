webpackJsonp([4],{Oage:function(t,s){},UHxT:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[null!=t.result?e("div",{staticClass:"material-receive-record"},[e("div",{staticClass:"mb12 ui-table-order mt12"},[e("div",{staticClass:"ui-table-h ui-table-gray clearfix material-receive-tablehead c64"},[e("span",[t._v(t._s(t.$changeDateToString(t.result.createTime)))]),t._v(" "),e("span",[t._v("操作人："+t._s(t.result.operator))]),t._v(" "),e("span",[t._v("累计领取原材料数量："),e("strong",{staticClass:"c32"},[t._v(t._s(t.result.productNum))])]),t._v(" "),e("span",[t._v("实际使用数量："),e("strong",{staticClass:"c32"},[t._v(t._s(t.result.actualUseNum))])]),t._v(" "),e("span",[t._v("盘点单号："+t._s(t.result.orderSn))])]),t._v(" "),t._m(0),t._v(" "),t._l(t.result.productList,function(s,i){return e("div",{key:i,staticClass:"ui-table border-t bg-white"},[e("div",{staticClass:"mainlist-con clearfix"},[e("div",{staticClass:"clearfix mainlist-con1",staticStyle:{width:"40%"}},[e("div",{staticClass:"fl make-p-info"},[e("span",{staticClass:"make-p-name f14 c32"},[t._v(t._s(s.productName))])])]),t._v(" "),e("div",{staticClass:"mainlist-con2 c64 text-center",staticStyle:{width:"15%"}},[t._v(t._s(s.productSn))]),t._v(" "),e("div",{staticClass:"mainlist-con3 c64 text-center",staticStyle:{width:"15%"}},[e("strong",{staticClass:"cred"},[t._v("￥"+t._s((s.productPrice/1).toFixed(2)))])]),t._v(" "),e("div",{staticClass:"mainlist-con4 c64 text-center",staticStyle:{width:"15%"}},[e("strong",[t._v(t._s(s.productNum))])]),t._v(" "),e("div",{staticClass:"mainlist-con5 c64 text-center",staticStyle:{width:"15%"}},[e("strong",[t._v(t._s(s.actualUseNum))])])])])})],2)]):t._e()])},staticRenderFns:[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"ui-table border-t bg-white"},[e("div",{staticClass:"mainlist-con clearfix"},[e("div",{staticClass:"clearfix mainlist-con1",staticStyle:{width:"40%"}},[e("div",{staticClass:"fl make-p-info"},[e("span",{staticClass:"make-p-name c96"},[t._v("商品名称")])])]),t._v(" "),e("div",{staticClass:"mainlist-con2 c96 text-center",staticStyle:{width:"15%"}},[e("span",[t._v("商品编码")])]),t._v(" "),e("div",{staticClass:"mainlist-con3 c96 text-center",staticStyle:{width:"15%"}},[t._v("价格")]),t._v(" "),e("div",{staticClass:"mainlist-con4 c96 text-center",staticStyle:{width:"15%"}},[t._v("领取数量")]),t._v(" "),e("div",{staticClass:"mainlist-con5 c96 text-center",staticStyle:{width:"15%"}},[t._v("实际使用数量")])])])}]};var a=e("Z0/y")({data:function(){return{msg:"这个是历史盘点详情页",result:null}},methods:{getData:function(t){var s=this;this.$emit("controLoading",!0),t||(t={inventoryOrderSn:this.$route.query.orderSn}),this.$httpExt().post("/materials/getInventoryHistoryDetail",t).then(function(t){s.result=t,s.$emit("controLoading",!1)},function(t){s.$emit("showError",t.errorCode+":"+t.errorMsg)})}},mounted:function(){this.getData()}},i,!1,function(t){e("Oage")},null,null);s.default=a.exports}});