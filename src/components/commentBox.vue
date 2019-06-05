<template>
    <div id="commentBox">
        <div class="box1"><div>说点什么吧</div></div>
        <textarea class="box2" v-model="items.text" ref="count" placeholder=""></textarea>
        <div id="zishu">你还可以输入{{number}}个字</div>
        <div class="box3"><div class="bth" @click="addComment">发布</div></div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'commentBox',
    mounted() {
        
    },
    data:function(){
        return{
            maxlength:140,// 字数限制
            number:140,
            items:{
                text:''
            }
           
        }
    },
    methods:{
        async addComment(){
            if(this.user.username){
                if(this.items.text===''){
                    alert("内容不能为空！")
                    return;
                }
                let param = new URLSearchParams()
                param.append('newId', this.$route.query.NewsID)
                param.append('responder',this.user.username )
                param.append('reviewers', this.newsData.username)
                param.append('content', this.items.text)
                let addComment = await this.$http({
                    method:'post',
                    data:param,
                    url:this.$apiList['addComment']
                });
                if(addComment.data){
                    this.items.text =''
                    this.$refs.count.value = ''
                    this.$emit('addComment',addComment.data)
                }else{
                    alert("评论失败！")
                    return;
                }
            }else{
                alert("登录后才能发表");
                return;
            }   
        }
    },
    watch:{ //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
        items:{
            handler:function(){
                let _this = this;
                _this.$refs.count.setAttribute("maxlength",_this.maxlength);
                _this.number= _this.maxlength - _this.$refs.count.value.length;
            },
            deep:true
        }
    },
    computed:{
        ...mapState({
           // 获取用户信息
            user:state => state.currentUser,
            // 获取新闻内容
            newsData:state => state.news.newsData,
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../assets/style/mixin';
#commentBox{
    position: relative;
    .mx_wh(90%,180px);
    background:#fff;
    margin: 50px auto;
    margin-top:20px;
    border:1px solid  rgb(18, 57, 139);
    border-radius:1px;
    .box1{
        .mx_whlh(auto,30px,30px);
        color:#fff;
        div{
            padding-left:20px;
            background:rgb(18, 57, 139);
            border-top-left-radius:1px;
            border-top-right-radius:1px;   
        }
    }

    .box2{
        .mx_wh(95%,80px);
        border:1px solid rgb(18, 57, 139);
        margin:10px 2%;
        text-indent:10px;
        .mx_fc(15px,rgb(0, 0, 0));
        padding: 0.5%;
        box-shadow:0 0 4px rgb(18, 57, 139);
    }
    .box3{
        .mx_wh(80px,30px);
        .mx_posbr(8px,10px);
        .bth{
            display: block;
            .mx_fc(13px,#fff);
            line-height:30px;
            cursor: pointer;
            background:rgb(18, 57, 139);
            border-radius:6px;
            text-align:center;
            text-decoration: none;
        }
        bth:hover{
            background:rgb(101, 120, 160);
        }
    }

    #zishu{
        .mx_posbr(65px,20px);
        .mx_fc(10px,rgba(95, 92, 92, 0.88));
    }
}
</style>