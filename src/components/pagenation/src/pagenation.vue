<template>
    <ul class="pagination">
        <li :class="{'disabled': currentPage == 1}">
            <a href="javascript:void(0);" class="prev" @click="setCurrent(currentPage - 1)">上一页</a>
        </li>
        <li :class="{'active': currentPage == 1}">
            <a href="javascript:void(0);" @click="setCurrent(1)">1</a>
        </li>
        <li v-for="p in grouplist" :class="{'active': currentPage == p.val}" :key="p.index">
            <template v-if="p.val != 1 && p.val != page"><a href="javascript:void(0);" @click="setCurrent(p.val)">{{
                p.text }}</a></template>
        </li>
        <template v-if="page>1">
            <li :class="{'active': currentPage == page}"><a href="javascript:void(0);" @click="setCurrent(page)">{{ page
                }}</a></li>
        </template>
        <li :class="{'disabled': currentPage == page}">
            <a href="javascript:void(0);" class="next" @click="setCurrent(currentPage + 1)">下一页</a>
        </li>
        <li class="page_go">到第 <input type="text" class="go_page" v-model.number="go" @input="keyin"><b>页</b>
            <a href="javascript:void(0);" @click="setCurrent(go)" class="go_but">GO</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "st-pagenation",
        data() {
            return {
                current: this.currentPage,
                go: '',
                group:5//分页条数
            }
        },
        props: {
            total: {// 数据总条数
                type: Number,
            },
            size: {// 每页显示条数
                type: Number,
            },
            currentPage: {// 当前页码
                type: Number,
            },
        },
        computed: {
            pagegroup: function () {
                this.group = this.group > 0 ? this.group : 5;
                return this.group % 2 === 1 ? this.group : this.group + 1;
            },
            page: function () { // 总页数
                return Math.ceil(this.total / this.size) == 0 ? 1 : Math.ceil(this.total / this.size);
            },
            grouplist: function () { // 获取分页页码
                var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
                if (len <= this.pagegroup) {
                    while (len--) {
                        temp.push({text: this.page - len, val: this.page - len});
                    }
                    ;
                    return temp;
                }
                while (len--) {
                    temp.push(this.page - len);
                };
                var idx = temp.indexOf(center);
                (idx < count) && ( center = center + count - idx);
                (this.current > this.page - count) && ( center = this.page - count);
                temp = temp.splice(center - count - 1, this.pagegroup);
                do {
                    var t = temp.shift();
                    list.push({
                        text: t,
                        val: t
                    });
                } while (temp.length);
                if (this.page > this.pagegroup) {
                    (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
                    (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
                }
                return list;
            }
        },
        methods: {
            setCurrent: function (idx) {
                if (this.currentPage != idx && idx > 0 && idx < this.page + 1) {
                    this.current = idx;
                    this.$emit('pagechange', this.current);
                    //回到页面顶部
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }
            },
            keyin: function () {
                if (typeof this.go == 'string') {
                    this.go = '';
                }
                this.go = Math.ceil(this.go)
                if (this.go < 0) {
                    this.go = 0;
                }
                if (this.go > this.page) {
                    this.go = this.page;
                }
            }
        }
    };
</script>

<style scoped>
    .pagination a:hover {
        text-decoration: none;
    }
    .pagination {
        width: 100%;
        padding: 20px 0;
        text-align: center;
    }

    .pagination li {
        display: inline-block;
    }

    .pagination .disabled a,
    .pagination .disabled a:hover {
        color: #c7c7c7;
        cursor: default;
        background: #f6f6f6;
        cursor: not-allowed;
    }

    .pagination a {
        height: 26px;
        line-height: 26px;
        padding: 0 10px;
        display: inline-block;
        color: #646464;
    }

    .pagination .prev,
    .pagination .next,
    .go_but {
        height: 24px;
        line-height: 24px;
        border: #dcdcdc 1px solid;
        color: #646464;
        background-color: #f6f6f6;
    }

    .pagination .prev {
        margin-right: 10px;
    }

    .pagination .active a,
    .pagination a:hover {
        color: #fff;
        background-color: #3488fa;
    }

    .page_go {
        padding-left: 30px;
        position: relative;
    }

    .go_page {
        width: 50px;
        height: 24px;
        border: #b2b2b2 1px solid;
        text-align: center;
        padding-right: 20px;
    }

    .page_go b {
        font-weight: normal;
        display: block;
        position: absolute;
        margin-left: 81px;
        margin-top: -23px;
        color: #969696;
    }

    .go_page:hover {
        border-color: #3488fa;
    }
</style>
