<template>
    <div id="newsList">
         <el-card class="box-card">
            <div v-if="newsList.total">
                <div v-for='news in newsList.list' class="text item clearfix">
                    
                    <div class="imgbox">
                        <router-link :to="{
                            path:'newsPage',
                            query: {
                                NewsID: news.newsId, 
                                }
                            }">
                                <img :src="news.imgUrl">
                        </router-link>
                    </div>

                    <router-link class="title routerlink" :to="{
                            path:'newsPage',
                            query: {
                                NewsID: news.newsId, 
                                }
                            }">{{news.newsTitle}}</router-link>
                
                </div>

                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="newspage.size"
                    :total="newsList.total"
                    :current-page="newspage.currentPage"
                    @current-change="handleCurrentChange"
                    style="text-align: center">
                </el-pagination>

            </div>
            <div v-else>暂无新闻</div>
        </el-card>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'newsList',
    props: ['type'],
    mounted() {
        this.getNewsList(this.newspage);
    },
    data(){
        return{
            newspage:{
                size:2,
                currentPage:1
            },
            isClosed:false
        }
    },
    methods:{
        // 获取新闻列表
        getNewsList(newspage){
            let param = new URLSearchParams()
            param.append('pageNo', newspage.currentPage)
            param.append('pageSize', newspage.size)
            param.append('type', this.type)
            this.$store.dispatch('get_NewsList',param);
        },
        // 页数改变时
        handleCurrentChange(val) {
            this.newspage.currentPage = val;
            this.getNewsList(this.newspage);
        }
    },
    computed:{
        ...mapState({
           // 获取新闻列表
            newsList:state => state.news.newsList,
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../assets/style/mixin';
#newsList{
    .mx_wh(100%,400px);
    .box-card {
        width: 98%;
        margin: auto;
        .text {
            font-size: 18px;
            text-align: left;
        }
        .item {
            padding: 18px 0;
            height:120px;
        }
        img {
            display:block;
        }
        .imgbox {
            width:160px;
            border:solid 2px gray;
            height:120px;
            overflow:hidden;
            float: left;
            margin-right:20px; 
            img {
                width:160px;
                height:120px;
                position:relative; 
                transition:all 1s;
            }
        }
        .imgbox:hover img{
            transform:scale(1.5,1.5);
        }
        .routerlink{
            text-decoration:none;
            color: black;
        }
        .routerlink:hover{
            text-decoration:underline;
        }
    }   
}
</style>
