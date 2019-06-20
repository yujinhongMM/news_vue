<template>
    <div id="headerNav">
        <div class="rigth">微微日报</div>
        <div v-if="this.isLogin" class="left">
            <span>
                欢迎你，{{user.username}}
            </span>
            
            <el-dropdown class="headPortraitWrap">
                <div class="headPortrait">
                    <img :src="user.headPortraitUrl"><i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-chat-line-round">我的消息</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-plus" v-if="user.power==1" @click.native="newsManage()">新闻管理</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-close" @click.native="logout()">退出系统</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div v-else class="left">
            <div class="login"><router-link :to="{path:'loginPage'}" class="router">登录</router-link></div>
            <div class="login">注册</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'headerNav',
    mounted() {
        let user=JSON.parse(localStorage.getItem("user"));
        if(user){
            // 将用户放入vuex
            this.$store.dispatch('get_User',user);
        }
    },
    data:function(){
        return{
           
        }
    },
    methods:{
        logout:function(){
            // 从localStorage删除所有保存的数据
            localStorage.setItem("user",null);
            this.$store.dispatch('get_User',undefined);
        },
        newsManage:function(){
            this.$router.push({ name: 'newsManagePage'});
        }
    },
    computed:{
        ...mapState({
           // 获取用户信息
            user:state => state.currentUser,
            isLogin:state => state.isLogin
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../assets/style/mixin';
#headerNav{
    .backgroundGreen;
    .mx_whlh(100%,40px,40px);
    .mx_flex;
    .mx_flex_content;
    .rigth{
        padding-left: 5%;
        width: 20%;
        .mx_fc(20px,white);
    }
    .left{
        .mx_whlh(70%,40px,40px);
        padding-right: 5%;
        .mx_flex;
        .mx_fc(14px,white);
        justify-content: flex-end;
        .login{
            .mx_whlh(20%,40px,40px);
            .router{
                .mx_fc(14px,white);
                text-decoration:none;
            }
        }
        .headPortraitWrap{
            padding-left:5%;
            .headPortrait{
                .mx_flex;
                .mx_flex_mid;
                img{
                    margin-top:5px;
                    .mx_wh(30px,30px);
                }
                i{
                    color:white !important;
                }
            }
        }
        
    }

}
</style>
