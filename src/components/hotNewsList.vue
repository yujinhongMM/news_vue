<template>
    <div id="hotList">
        <span><i class="icon iconfont iconfont0 icon-huo"></i>热点排行</span>
        <div v-if=" hotNewsList.total ">
            <div v-for='(news,index) in hotNewsList.list'>
                <i :class="iconicon4[index]"></i>
                <router-link :to="{
                    path:'newsPage',
                    query: {
                            NewsID: news.newsId, 
                        }
                    }" class="routerlink">{{ news.newsTitle }}</router-link>
            </div>
        </div>
        <div v-else> 暂无排行 </div>  
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'hotNewsList',
    mounted() {
        this.$store.dispatch('get_HotNewsList');
    },
    data:function(){
        return{
            iconicon4:[
                "icon iconfont icon-icon41",
                "icon iconfont icon-icon42",
                "icon iconfont icon-icon43",
                "icon iconfont icon-icon44",
                "icon iconfont icon-icon45",
                "icon iconfont icon-icon46"
            ]
        }
    },
    methods:{
       
    },
    computed:{
       ...mapState({
           // 获取新闻列表
            hotNewsList:state => state.news.hotNewsList,
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../assets/style/mixin';
#hotList{
    .iconfont{
        font-size: 16px;
        color: rgb(226, 77, 77);
        font-weight:700;
    }
    .iconfont0{
        font-size: 40px;
        line-height: 60px;
        color: rgb(226, 77, 77);
    }
    .routerlink{
        text-decoration:none;
        color: black;
        line-height: 30px;
    }
    .routerlink:hover{
        text-decoration:underline;
    }
}
</style>
