<template>
    <!--评论框-->
    <div id="replyBox">
        <textarea type="text" ref="count" v-model="items.text" class="reply-text" autocomplete="off" :maxlength="maxlength" placeholder="请输入内容"></textarea>
        <el-button type="primary" class="reply-btn" @click="addReply">回复</el-button>
        <span class="reply-nub">{{number}}/140</span> 
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'replyBox',
    props: ['commentId','reviewers'],
    mounted() {
        
    },
    data:function(){
        return{
            maxlength:140,// 字数限制
            number:0,
            items:{
                text:''
            }
        }
    },
    methods:{
        async addReply(){
            if(this.user.username){
                if(this.items.text===''){
                    alert("内容不能为空！")
                    return;
                }
                let param = new URLSearchParams()
                param.append('commentId', this.commentId)
                param.append('responder',this.user.username )
                param.append('reviewers', this.reviewers)
                param.append('content', this.items.text)
                let addReply = await this.$http({
                    method:'post',
                    data:param,
                    url:this.$apiList['addReply']
                });
                if(addReply.data){
                    this.items.text =''
                    this.$refs.count.value = ''
                    alert("回复成功！")
                    this.$emit('addReply',addReply.data)
                }else{
                    alert("回复失败！")
                    return;
                }
            }else{
                alert("登录后才能回复");
                return;
            }   
        }
    },
    watch:{ //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
        items:{
            handler:function(){
                let _this = this;
                _this.$refs.count.setAttribute("maxlength",_this.maxlength);
                _this.number= _this.$refs.count.value.length;
            },
            deep:true
        }
    },
    computed:{
        ...mapState({
            // 获取用户信息
            user:state => state.currentUser
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../assets/style/mixin';
#replyBox{
    *zoom:1;
    text-align: left;
    .reply-text {
        text-align: left;
        border:1px solid #eee;
        display:block;
        .mx_wh(98%,15px);
        padding:5px;
        resize:none;
        color:#ccc;
        font-size:12px;
        height:50px;
        color:#333;
        border:1px solid #4d40ff;
    }
    .reply-btn {
        float:right;
        margin:2px 0;
        .mx_whlh(65px,16px,0px);
        .mx_fc(12px,white);
        cursor: pointer;
    }

    .reply-nub {
        margin:2px 0;
        float:left;
        padding:3px 5px;
        color:#666;
    }
}
#replyBox:after{
    clear:both;
	content:'';
	display:block;
	width:0;
	height:0;
	visibility:hidden;
}
</style>