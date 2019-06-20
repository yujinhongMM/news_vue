<template>
    <div id="comment" v-clickoutside="handleClose">
        <!--评论者头像 这里通过评论者的用户名获取的头像-->
        <div class="head">
            <img :src="commentContent.headPortraitUrl" :alt="commentContent.responder">
        </div>
         <!--评论者内容板块-->
        <div class="content">
            <p class="text">
                <!--评论者姓名-->
                <span class="name">{{ commentContent.responder }}
                    <span v-if="newsData.username===commentContent.responder" style="color:red;">(作者)</span>
                </span>
                
                <!--评论者内容-->
                {{ commentContent.content }}
            </p>
            <!--评论者时间点赞板块-->
            <div class="good">
                <!--判断是不是自己发的评论，如果是自己发的评论则可以删除-->
                <div v-if="isLogin">
                    <div class="deleteReply" @click="deleteComment(commentContent.commentId,commentContent.responder)" v-if="user.username === commentContent.responder">删除</div>
                </div>
                <!--回复评论-->
                <div class="deleteReply" @click="clickReply">回复</div>
                <!--评论者时间-->
                <div class="date">{{ commentContent.commentTime }}</div>
                <!--为评论者点赞地方-->
                <div class="dzan" href="javascript:;"><i class="icon iconfont icon-ai-like"></i>{{ commentContent.likenumber }}</div>    
            </div>
            <replyBox v-show="show" :reviewers="commentContent.responder" :commentId="commentContent.commentId" @addReply="replyMsg"></replyBox>        
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import replyBox from '../components/replyBox';

const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};

export default {
    name: 'comment',
    props: ['commentContent'],
    components:{
		replyBox
    },
    mounted() {
       
    },
    data:function(){
        return{
			show: false
        }
    },
    directives: {clickoutside},
    methods:{
       async deleteComment(commentId,responder){
           if(this.user.username){
                if(this.user.username != responder){
                    alert("你没有权限删除！")
                    return;
                }
                let param = new URLSearchParams()
                param.append('commentId', commentId)
                let deleteComment = await this.$http({
                    method:'post',
                    data:param,
                    url:this.$apiList['deleteComment']
                });
                if(deleteComment.data){
                    this.$emit('deleteComment',deleteComment.data)
                }else{
                    alert("删除评论失败！")
                    return;
                }
            }else{
                alert("登录后才能删除");
                return;
            }  
        },
		handleClose(e) {
            this.show = false;
        },
        clickReply(){
            this.show = true;
        },
        replyMsg(v){
            if(v){
                this.show = false
                this.$emit('addReply',v)
            }
        }
    },
    computed:{
        ...mapState({
           // 获取用户信息
            user:state => state.currentUser,
            isLogin:state => state.isLogin,
            // 获取新闻内容
            newsData:state => state.news.newsData,

        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../assets/style/mixin';
#comment{
    .mx_flex;
    .head{
        .mx_wh(40px,40px);
        overflow:hidden;
        padding:0 10px 10px 10px;
        img{
            width: 100%;
        }
    }
    .content{
        .mx_whlh(100%,auto,22px);
        .text{
            .mx_whlh(100%,auto,22px);
            .mx_fc(16px,rgb(0, 0, 0));
            .name{
                .mx_fc(15px,rgb(9, 1, 107));
                font-weight: bolder;
                padding: 0 10px;
            }
        }
        .good{
            .mx_whlh(100%,auto,22px);
            .mx_flex;
            .mx_flex_content;
            justify-content:flex-end;
            .deleteReply{
                .mx_fc(15px,rgb(70, 147, 235));
                font-weight: bolder;
                cursor: pointer;
                padding-right:10px; 
            }
            .date{
                .mx_fc(14px,rgb(0, 0, 0));
                padding-right:20px;
            }
            .dzan{
                .mx_fc(14px,rgb(0, 0, 0));
                .iconfont{
                    .mx_fc(16px,rgb(126, 126, 126));
                    padding-right:10px; 
                }
            }
        } 
    }
}
</style>
