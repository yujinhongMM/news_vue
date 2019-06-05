<template>
    <div id="newsContentWrap">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="box" v-if="isFromManage">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/newsManagePage' }">我的新闻</el-breadcrumb-item>
            <el-breadcrumb-item>{{newsData.type}}新闻详情</el-breadcrumb-item>    
        </el-breadcrumb>  
        <el-breadcrumb separator-class="el-icon-arrow-right" class="box" v-else>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{newsData.type}}新闻详情</el-breadcrumb-item>    
        </el-breadcrumb>  
        <div class="time">作者：{{ newsData.username }}&nbsp;&nbsp;发布时间：{{ newsData.newsTime }}</div>
        <div class="title">{{ newsData.newsTitle }}</div>
        <div v-html="newsData.newsContent" class="newsContent ql-editor">
            
        </div>       
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name:'newsContent',
    mounted(){
        let param = new URLSearchParams()
        param.append('newsId', this.$route.query.NewsID)
        this.$store.dispatch('get_NewsData',param);
        if(this.$route.query.isFromManage){
            this.isFromManage = this.$route.query.isFromManage
        }
    },
    data:function(){
        return{
            isFromManage:false
        }
    } ,
    methods:{
        
    },
    computed:{
        ...mapState({
            // 获取新闻内容
            newsData:state => state.news.newsData,
        })
    }
}
</script>
<style scoped lang="less">
@import '../assets/style/mixin';
#newsContentWrap{
    .mx_wh(90%,auto);
    padding: 0 5%;
    .box{
        padding:20px 0; 
        .mx_fc(20px,black); 
    }
    .title{
        .mx_fc(30px,black);
        padding: 20px auto 0px;
        font-weight:bold;
        text-align: center;
        padding: 25px;
    }
    .time{
        .mx_fc(16px,black);
        text-align: left;
    }
    .newsContent{
        margin: auto;
    }
  
   
    
}


</style>