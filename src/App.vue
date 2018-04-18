<template>
    <div id="app">
        <div v-if="partnerInfo!=null&&partnerInfo!=''">
            <!--菜单导航-->
            <navigation></navigation>
            <div class="main">
                <!--内容头部-->
                <top :partnerInfo="partnerInfo"></top>
                <!--路由页面内容展示部分-->
                <router-view :partnerInfo="partnerInfo" @showError="showErrorTips" @controLoading="controLoading"/>

                <!-- S 失败 -->
                <st-notification width="40%" :visible.sync="errorTips">
                    <div class="pop-suc-box clearfix">
                        <i class="fl icon-zcp-fail"></i>
                        <div class="fl">
                            <p class="c32 f24">{{errorTitle}}</p>
                            <p class="c96 tips"><br/>
                                <br /> {{errorMsg}}
                            </p>
                        </div>
                    </div>
                </st-notification>
                <!-- E 失败 -->
                <!--S Loading-->
                <st-loading v-if="isLoading">加载中</st-loading>
                <!--E Loading-->
            </div>
        </div>
        <div v-if="partnerInfo==''" style="padding: 10px;">
            <select v-model="user.loginType">
                <option value="0">自营</option>
                <option value="1">委托</option>
            </select>
            <br>
            <st-input type="text" placeholder="请输入店长账号" v-model="user.username" style="width: 200px "
                      class="login"></st-input>
            <span v-if="userErrorMsg!=null" style="color: red;">{{userErrorMsg}}</span>
            <br>
            <st-input type="password" placeholder="请输入密码" v-model="user.password" style="width: 200px"
                      class="login"></st-input>
            <span v-if="passErrorMsg!=null" style="color: red;">{{passErrorMsg}}</span>
            <br>
            <st-button @click="login" type="ss" class="login">登录</st-button>
        </div>
    </div>

</template>

<style>
    .login {
        margin-top: 5px;
    }
</style>

<script>
    export default {
        name: 'App',
        data () {
            return {
                partnerInfo: null,
                user: {
                    loginType: 0,
                    username: null,
                    password: null
                },
                userErrorMsg: null,
                passErrorMsg: null,
                errorTitle: "错误提示",
                errorMsg:"",
                errorTips:false,
                isLoading:false,
            };
        },
        methods: {
            controLoading (booVal) {
                this.isLoading = booVal;
            },
            showErrorTips (title,msg) {
                this.isLoading = false;
                this.errorTips=true
                this.errorTitle = title;
                this.errorMsg = msg;
            },
            login () {
                var upToken = {
                    loginType: 0,
                    username: this.user.username,
                    password: this.user.password
                }
                if (this.user.username == null) {
                    this.userErrorMsg = "请输入用户名！";
                    if (this.user.password == null) {
                        this.passErrorMsg = "请输入密码！";
                    }
                    return;
                }
                this.$httpExt().post('user/login', upToken).then(response => {
                    this.$setCookie('token', response, {path: '/'});
                    alert("登录成功!");
                }, (response) => {
                    this.userErrorMsg = response.errorMsg
                }).then(response => {
                    this.getUserInfo();
                    this.$router.push("/makeIndex");
                })
            },
            getUserInfo () {
                this.$httpExt().post('user/getUserInfo').then(response => {
                    this.$setPartnerInfo(response);
                }, (response) => {
                    alert(response.errorCode + ":" + response.errorMsg);
                }).then(response => {
                    this.partnerInfo = this.$getPartnerInfo();
                })
            }
        },
        mounted () {
            if (this.$getPartnerInfo() == '') {
                this.getUserInfo();
            }
        }
    };
</script>

