<template>
    <div id="newsPageWrap">
        <!--头部组件开始-->
        <headerNav></headerNav>
        <!--头部组件结束-->
        <!--新闻内容开始-->
        <newsContent></newsContent>
        <!--新闻内容结束-->
        <!--评论回复开始-->
        <commentList></commentList>
        <!--评论回复结束-->
    </div>
</template>

<script>
// 导入头部
import headerNav from '../components/headerNav';
import newsContent from '../components/newsContent';
import commentList from '../components/commentList';
export default {
    name: 'newsPage',
    components:{
            headerNav,
            newsContent,
            commentList
        },
    data () {
        return {

        }
    },
    methods: {
        
    }
}
</script>
<style lang="less" scoped> 
@import '../assets/style/mixin';
#newsPageWrap{
    .mx_wh(75%,auto);
    margin: auto;
    background: white;
    .comment_h{
        .mx_whlh(100%,60px,60px);
    }
}
</style>
