<template>
    <div>
        <div class="input-number" :class="[size ? 'input-number-'+size : '',direction?'input-number-'+direction:'']">
            <button
                    class="input-number-btn minus"
                    @click="minus"
                    :class="{unclick:isunclick0}"
            >
                <i class="el-icon-minus"></i>
            </button>
            <input type="text" class="input-number-amount" v-model="num" @input="input(num)" :max="max" :min="min"
                   :mintip="mintip" :maxtip="maxtip">
            <button
                    class="input-number-btn plus"
                    @click="add"
                    :class="{unclick:isunclick1}"
            >
                <i class="el-icon-plus"></i>
            </button>
        </div>
        <p class="cred pt10 minnumber-tips position-absolute" v-show="minNumberTips">{{numtips}}</p>
    </div>
</template>

<script>
    export default {
        name: "st-input-number",
        data() {
            return {
                //  x && y ? this.parentNum : 1
                // num: (this.parentNum >= this.min && this.parentNum <= this.max) ? this.parentNum : 1,
                // num: this.parentNum,
                num: (function (self) {
                    if (self.parentNum >= self.min && self.parentNum <= self.max) {
                        return self.parentNum;
                    } else {
                        return 1;
                    }
                })(this),
                isunclick0: false,
                isunclick1: false,
                minNumberTips: false,
                numtips: '',
            }
        },
        props: {
            obj: {
                type: Object,
                default: null
            },
            size: {
                type: String,
                default: "small"
            },
            max: {
                type: Number,
                default: Infinity
            },
            min: {
                type: Number,
                default: -Infinity
            },
            maxtip: {
                type: String,
                default: ''
            },
            mintip: {
                type: String,
                default: ''
            },
            parentNum: {
                type: Number,
                default: 1
            },
            direction: {
                type: String,
                default: ''
            }
        },
        watch: {
            parentNum (newVal,oldVal) {
                this.num = newVal;
            },
            num () {
                this.check();
            }

        },
        methods: {
            check: function () {
                if (this.num >= this.max) {
                    this.minNumberTips = true;
                    // this.numtips = '已达到最大制作数量';
                    this.numtips = this.maxtip;
                    this.isunclick0 = false;
                    this.isunclick1 = true;
                } else if (this.num <= this.min) {
                    this.minNumberTips = true;
                    // this.numtips = '请输入本次制作数量';
                    this.numtips = this.mintip;
                    this.isunclick0 = true;
                    this.isunclick1 = false;
                    this.num = this.min;
                } else {
                    this.minNumberTips = false;
                    this.isunclick0 = false;
                    this.isunclick1 = false;
                }
                this.$emit('change-number', this.num, this, this.obj);
            },
            minus: function () {
                //减
                if (this.num > this.min) {
                    this.num--;
                    this.check();
                }
            },
            add: function () {
                //加
                if (this.num < this.max) {
                    this.num++;
                    this.check();
                }
            },
            input: function (num) {
                //输入
                var number = num.toString();
                var number2 = number.replace(/[^\d]/g, "");
                number2 = number2 == "" ? this.min : number2;
                this.num = parseInt(number2);
                this.num = this.num > this.max ? this.max : this.num;
                this.check();
            }
        }
    };
</script>

<style scoped>
    .input-number {
        position: relative;
        width: 175px;
        height: 45px;
        padding: 0 56px 0 54px;
        box-sizing: border-box;
    }

    .input-number-btn {
        position: absolute;
        top: 0;
        text-align: center;
        transition: 0.4s;
        color: #646464;
        cursor: pointer;
        display: inline-block;
        height: 45px;
        line-height: 45px;
        width: 54px;
        font-size: 18px;
        border: #b2b2b2 1px solid;
        font-weight: bold;
        background-color: #f6f6f6;
        outline: none;
    }

    .input-number-btn:hover {
        color: #388cf6;
    }

    .input-number-btn.minus {
        left: 0;
        border-right: none;
        border-radius: 4px 0 0 4px;
    }

    .input-number-btn.plus {
        right: 0;
        border-left: none;
        border-radius: 0 4px 4px 0;
    }

    .input-number-large {
        width: 175px;
        padding: 0 56px 0 54px;
    }

    .input-number-large .input-number-btn.minus,
    .input-number-large .input-number-btn.plus {
        height: 45px;
        line-height: 45px;
        width: 54px;
    }

    .input-number-large .input-number-amount {
        height: 43px;
        line-height: 45px;
    }

    .input-number-small {
        width: 94px;
        padding: 0 28px;
        height: 26px;
    }

    .input-number-small .input-number-btn.minus,
    .input-number-small .input-number-btn.plus {
        width: 28px;
        height: 26px;
        line-height: 26px;
        font-size: 14px;
    }

    .input-number-small .input-number-amount {
        height: 26px;
        line-height: 26px;
        box-sizing: border-box;
        font-size: 14px;
    }

    .minnumber-tips {
        left: 0;
        right: 0;
    }

    .input-number-amount {
        width: 100%;
        font-size: 18px;
        height: 43px;
        line-height: 45px;
        overflow: hidden;
        padding: 0;
        text-align: center;
        font-family: arial;
        border: #b2b2b2 1px solid;
        transition: 0.4s;
    }

    .input-number:hover .input-number-btn {
        border-color: #388cf6;
    }

    .input-number:hover .input-number-amount {
        border-top-color: #388cf6;
        border-bottom-color: #388cf6;
    }

    .input-number-up + p {
        bottom: 66px;
        right: -97px;
    }
</style>

