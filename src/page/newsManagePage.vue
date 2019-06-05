<template>
    <div id="newsManagePageWrap">
        <!--头部组件开始-->
        <headerNav></headerNav>
        <!--头部组件结束-->
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="box">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>我的新闻</el-breadcrumb-item>
            </el-breadcrumb> 
            <el-row>
                <el-button type="primary" style="float:right;" @click="ReleaseNews">+发布新新闻</el-button> 
            </el-row>
            <div v-if="userNewsList.total!=0">

                <el-table :data="userNewsList.list" style="width: 100%">
                    <el-table-column prop="newsTime" label="日期" width="200"></el-table-column>

                    <el-table-column prop="imgUrl" label="缩略图">
                        <template slot-scope="scope">
                            <div class="imgbox">
                                <img :src="scope.row.imgUrl">
                            </div>
                        </template>
                    </el-table-column>
                    
                    
                    <el-table-column prop="newsTitle" label="标题" width="300"></el-table-column>
                    
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="newsInfo(scope.row)">查看</el-button>
                            <el-button type="text" size="small" @click="ModifyNews(scope.row)">修改</el-button>
                            <el-button type="text" size="small" @click="deleteNews(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    layout="prev, pager, next"
                    :total="userNewsList.total"
                    :page-size="newspage.size"
                    :current-page="newspage.currentPage"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <div v-else>
                你还没有发表过新闻！
            </div>
        </el-main>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// 导入头部
import headerNav from '../components/headerNav';
export default {
    name: 'newsManagePage',
    components:{
        headerNav
    },
    mounted() {
        this.getAxiosMynewslist(this.newspage);
    },
    data () {
        return {
            newspage:{
                size:3,
                currentPage:1
			}
        }
    },
    methods: {
        handleCurrentChange(val){
            this.newspage.currentPage = val;
            this.getAxiosMynewslist(this.newspage);
        },
        ReleaseNews(){
            this.$router.push({ name: 'addModifyNewsPage'});
        },
        newsInfo(row){
            // console.log(row.newsId)
            this.$router.push({ name: 'newsPage',query:{NewsID:row.newsId,isFromManage:true}});
        },
        getAxiosMynewslist(newspage){
            let param = new URLSearchParams()
            param.append('pageNo', newspage.currentPage)
            param.append('pageSize', newspage.size)
            param.append('username', this.user.username)
            this.$store.dispatch('get_UserNewsList',param)
        },
        ModifyNews(row){
            this.$router.push({ name: 'addModifyNewsPage',query:{NewsID:row.newsId}});
        },
        async deleteNews(row){
            let param = new URLSearchParams()
            param.append('newsId', row.newsId)
            let deleteNews = await this.$http({
                method:'post',
                data:param,
                url:this.$apiList['deleteNews']
            });
            if(deleteNews.data){
                let param = new URLSearchParams()
                    param.append('pageNo', this.newspage.currentPage)
                    param.append('pageSize', this.newspage.size)
                    param.append('username', this.user.username)
                this.$store.dispatch('get_UserNewsList',param)
            }
        }
            
    },
    computed:{
        ...mapState({
           // 获取用户信息
            user:state => state.currentUser,
            userNewsList:state => state.news.userNewsList
        })
    }
}
</script>
<style lang="less" scoped> 
@import '../assets/style/mixin';
#newsManagePageWrap{
    .mx_wh(70%,auto);
    margin: auto;
    background: white;
    .el-main {
        background-color: rgb(255, 255, 255);
        color: #333;
        text-align: center;
        min-height: 580px;
        height: auto;
        padding:20px 5%;
        box-sizing:border-box;
        .box{
            margin:10px 0; 
            font-size: 20px;
        }
        .imgbox {
            width:100px;
            border:solid 2px gray;
            height:80px;
            overflow:hidden;
            float: left;
            margin-right:20px; 
            img {
                display:block;
                width:100px;
                height:80px;
                position:relative; 
                transition:all 1s;
            }
        }
        .imgbox:hover{
            img{
                transform:scale(1.5,1.5);
            }
        }
    }
}
</style>
