import Vue from "vue";
import Router from "vue-router";
//import Components from "@/components/components";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/makeIndex'
        },
        {
            path: '/makeIndex',
            name: '首页',
            component: r => require.ensure([], () => r(require('@/module/Index/MakeIndex')))
        },
        {
            path: '/makeProductList',
            name: '制作商品',
            component: r => require.ensure([], () => r(require('@/module/makeproduct/MakeProductList')))
        },
        {
            path: '/makeProductList/makeProductDetail',
            name: '制作商品-填写实际制作数量',
            component: r => require.ensure([], () => r(require('@/module/makeproduct/MakeProductDetail')))
        },
        {
            path: '/modifyPriceList',
            name: '制成品改价',
            component: r => require.ensure([], () => r(require('@/module/modifyprice/ModifyPriceList')))
        },
        {
            path: '/materialList',
            name: '原材料管理',
            component: r => require.ensure([], () => r(require('@/module/materials/MaterialList')))
        },
        {
            path: '/materialList/pickList',
            name: '原材料管理-领取原材料',
            component: r => require.ensure([], () => r(require('@/module/materials/PickList')))
        },
        {
            path: '/materialList/pickHistoryList',
            name: '原材料管理-原材料领取记录',
            component: r => require.ensure([], () => r(require('@/module/materials/PickHistoryList')))
        },
        {
            path: '/materialList/pickHistoryList/pickHistoryDetail',
            name: '原材料管理-原材料领取记录-原材料领取详情',
            component: r => require.ensure([], () => r(require('@/module/materials/PickHistoryDetail')))
        },
        {
            path: '/materialList/inventoryList',
            name: '原材料管理-原材料盘点',
            component: r => require.ensure([], () => r(require('@/module/materials/InventoryList')))
        },
        {
            path: '/materialList/inventoryHistoryList',
            name: '原材料管理-原材料盘点记录',
            component: r => require.ensure([], () => r(require('@/module/materials/InventoryHistoryList')))
        },
        {
            path: '/materialList/inventoryHistoryList/inventoryHistoryDetail',
            name: '原材料管理-原材料盘点记录-原材料盘点详情',
            component: r => require.ensure([], () => r(require('@/module/materials/InventoryHsitoryDetail')))
        }
    ]
});
