<template>
    <div id="reply" class="clearfix" v-clickoutside="handleClose">
        <!--回复者头像 这里通过回复者的用户名获取的头像-->
        <div class="reply-left">
            <img :src="replyContent.headPortraitUrl" :alt="replyContent.responder">
        </div>
        <div class="reply-right">
            <div class="reply-text">
                <!--回复者用户名-->
                <span class="user">{{replyContent.responder}}
                    <span v-if="newsData.username===replyContent.responder" style="color:red;">(作者)</span>
                </span>
                <!--判断回复者是不是直接回复的评论者-->
               
                <span v-if="replyContent.reviewers===username">：</span>
                
                <span v-else>&nbsp;&nbsp;<span style="color:black;">回复</span>&nbsp;&nbsp;
                    {{replyContent.reviewers}}
                    <span v-if="newsData.username===replyContent.reviewers" style="color:red;">(作者)</span>：
                </span>
                    {{replyContent.content}}
            </div>
            <div class="reply-date">
                    <!--回复者赞-->
                <span class="reply-zan" href="javascript:;">
                    <!--判断该回复者是不是自己 是的话就可以删除-->
                    <span v-if="isLogin">
                        <span class="reply-dele" v-if="user.username === replyContent.responder" @click="deleteReply(replyContent.replyId,replyContent.responder)">删除</span>
                    </span>
                    <span class="reply-dele" @click="clickReply">回复</span> 
                    <span>
                        <!--回复者时间-->
                        {{replyContent.replyTime}}
                    </span>
                    <i class="icon iconfont icon-ai-like"></i>
                    &nbsp;
                    {{replyContent.likenumber}}
                </span> 
                
            </div>
            <replyBox v-show="show" :reviewers="replyContent.responder" :commentId="replyContent.commentId" @addReply="replyMsg"></replyBox>
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
    name: 'reply',
    props: ['replyContent','username'],
    components:{
		replyBox
    },
    mounted() {
        
    },
    data:function(){
        return{
           show:false
        }
    },
    methods:{
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
        },
        async deleteReply(replyId,responder){
           if(this.user.username){
                if(this.user.username != responder){
                    alert("你没有权限删除！")
                    return;
                }
                let param = new URLSearchParams()
                param.append('replyId', replyId)
                let deleteReply = await this.$http({
                    method:'post',
                    data:param,
                    url:this.$apiList['deleteReply']
                });
                if(deleteReply.data){
                    this.$emit('deleteReply',deleteReply.data)
                }else{
                    alert("删除回复失败！")
                    return;
                }
            }else{
                alert("登录后才能删除");
                return;
            }  
        }
    },
    directives: {clickoutside},
    computed:{
        ...mapState({
           // 获取用户信息
            user:state => state.currentUser,
            isLogin:state => state.isLogin,
            // 获取新闻内容
            newsData:state => state.news.newsData
        })
    }
        
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../assets/style/mixin';
#reply{
    .mx_flex;
    .mx_fc(10px,rgb(0, 0, 0));
    padding-left:10%;
    .reply-left {
        .mx_wh(28px,28px);
        margin-right:2%;
         img {
            width:100%;
            overflow:hidden;
        }
    }
    .reply-right {
        width: 88%;
        .reply-text {
            .mx_whlh(100%,auto,18px);
            span {
                color:#eb7350;
            }
        }
        .reply-date {
            .mx_whlh(100%,auto,18px);
            text-align: right;
            .mx_fc(10px,rgb(0, 0, 0));
            .reply-zan {
                .mx_fc(10px,rgb(126, 126, 126));
            }
            .reply-dele {
                .mx_fc(10px,rgb(70, 147, 235));
                font-weight: bolder;
                cursor: pointer;
                padding-right:10px; 
            }
        }
    }
     
    
    
}
</style>
