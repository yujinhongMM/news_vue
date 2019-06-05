<template>
    <div id="homePageWrap">
        <div id="homePage">
            <!--头部组件开始-->
            <headerNav></headerNav>
            <!--头部组件结束-->
            <!--左侧新闻开始-->
            <div class="left_box">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="时政" name="first">
                        <newsList type="时政" v-if="activeName==='first'"></newsList>
                    </el-tab-pane>
                    <el-tab-pane label="体育" name="second">
                        <newsList type="体育" v-if="activeName==='second'"></newsList>
                    </el-tab-pane>
                    <el-tab-pane label="娱乐" name="third">
                        <newsList type="娱乐" v-if="activeName==='third'"></newsList>
                    </el-tab-pane>
                    <el-tab-pane label="科技" name="fourth">
                        <newsList type="科技" v-if="activeName==='fourth'"></newsList>
                    </el-tab-pane>
                    <el-tab-pane label="财经" name="five">
                        <newsList type="财经" v-if="activeName==='five'"></newsList>
                    </el-tab-pane>
                    <el-tab-pane label="生活" name="six">
                        <newsList type="生活" v-if="activeName==='six'"></newsList>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!--左侧新闻结束-->
            <!--排行榜开始-->
            <div class="rigth_box">

            </div>
            <!--排行榜结束-->
        </div>
    </div>
</template>

<script>
// 导入头部
import headerNav from '../components/headerNav';
import newsList from '../components/newsList';

export default {
    name: 'homePage',
    components:{
            headerNav,
            newsList
        },
    data () {
        return {
            activeName: 'first'
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>
<style lang="less" scoped> 
@import '../assets/style/mixin';
#homePageWrap{
    padding-top:20px;
    #homePage{
        width: 70%;
        border: 1px solid #161333;
        margin:auto;
        
        background-color: white;
        .mx_flex;
        .mx_flex_content;
        .left_box{
            width: 60%;
            padding: 3%;
            border-right: 1px solid #c0bdbd85;
        }
        .rigth_box{
            width: 29%;
        }
    }
}

</style>
