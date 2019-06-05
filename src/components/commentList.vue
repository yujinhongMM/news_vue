<template>

<div id="pn"> 
	<h3>评论</h3>
	<commentBox @addComment="Msg"></commentBox>
	<ul v-if="commentList.total">
		<!--循环获取评论内容-->
		<li v-for="(item,index) in commentList.list">
			<comment v-bind:commentContent="item" @deleteComment="Msg" @addReply="Msg"></comment>

			<ul v-if="item.replyList.total">
				<!--循环获取回复内容-->
				<li class="list" v-for="reply in item.replyList.list">
					<reply v-bind:replyContent="reply" v-bind:username="item.responder" @addReply="Msg" @deleteReply="Msg"></reply>
				</li>
				<div class="more" v-if="!item.replyList.isLastPage" @click="lookMore(index)">查看更多</div>	
			</ul>
			<!-- <replyBox></replyBox> -->
		</li>				
	</ul>

	
	<p v-else>暂无评论，我来发表第一篇评论！</p>
	<el-pagination
		background
		layout="prev, pager, next"
		:total="commentList.total"
		:page-size="comment_page.size"
		:current-page="comment_page.currentPage"
		@current-change="comment_handleCurrentChange"
		style="text-align: center;">
	</el-pagination>

	
</div>
        
</template>


<script>
import comment from '../components/comment';
import reply from '../components/reply';
import commentBox from '../components/commentBox';
// import replyBox from '../components/replyBox';
export default {
    name:'commentList',
	components:{
		comment,
		reply,
		commentBox,
	    //replyBox
    },
	mounted() {
		this.getCommentList(this.comment_page);
	},
	data:function(){
		return{
			commentList:{},
			comment_page:{
                size:2,
                currentPage:1
			},
			reply_page:{
				size:2,
                currentPage:1
			}
		}
	},
    methods:{
		// 获取新闻评论列表
        async getCommentList(comment_page){
            let param = new URLSearchParams()
            param.append('pageNo', comment_page.currentPage)
            param.append('pageSize', comment_page.size)
			param.append('newsId', this.$route.query.NewsID)
            let commentList = await this.$http({
                method:'post',
                data:param,
                url:this.$apiList['commentList']
            });
            let len=commentList.data.list.length;
            for(let i=0;i<len;i++){
				commentList.data.list[i].headPortraitUrl =await this.getHeadPortraitUrl(commentList.data.list[i].responder);
				commentList.data.list[i].replyList = await this.getReplyList(this.reply_page,commentList.data.list[i].commentId);
			}
			this.commentList = commentList.data;
		},
		// 评论列表页数改变时
        comment_handleCurrentChange(val) {
            this.comment_page.currentPage = val;
            this.getCommentList(this.comment_page);
		},
		// 回复页数改变
		reply_handleCurrentChange(val){
		
		},
		// 获取回复列表
		async getReplyList(reply_page,commentId){
			let param = new URLSearchParams();
            param.append('pageNo', reply_page.currentPage);
            param.append('pageSize', reply_page.size);
			param.append('commentId', commentId);
			let replyList =await this.$http({
                method:'post',
                data:param,
                url:this.$apiList['replyList']
			});
			let len=replyList.data.list.length;
            for(let i=0;i<len;i++){
				replyList.data.list[i].headPortraitUrl =await this.getHeadPortraitUrl(replyList.data.list[i].responder);
			}
           	return replyList.data;
		},
		// 获取头像
		async getHeadPortraitUrl(username){
			let head_param = new URLSearchParams();
                head_param.append('username', username);
                // 获取头像
                let headPortraitUrl = await this.$http({
                    method:'post',
                    data:head_param,
                    url:this.$apiList['headPortraitUrl']
				});
			return headPortraitUrl.data;
		},
		Msg(v){
			if(v){
				this.getCommentList(this.comment_page);
			}
		},
		// 查看更多
		async lookMore(index){
			let reply_page={
				size:this.reply_page.size,
				currentPage:++this.commentList.list[index].replyList.pageNum
			}
			let replyList = await this.getReplyList(reply_page,this.commentList.list[index].commentId);
			let len = replyList.list.length
			for(let i=0;i<len;i++){
				this.commentList.list[index].replyList.list.push(replyList.list[i]) 
			}
			this.commentList.list[index].replyList.isLastPage = replyList.isLastPage;
		}

	},
	watch:{
		
	}
}
    
</script>
<style scoped lang="less">
@import '../assets/style/mixin';
#pn{
	.mx_wh(80%,auto);
	background:#fff;
	padding:20px;
	padding-left: 10%;
	h3,p,ul,li {
		margin:0;
		padding:0;
		border:none;
		outline:none;
		text-align: left;
	}
	p{
		text-align: center;
	}
	h3 {
		font-size:100%;
	}
	ul{
		li{
			list-style:none;
			ul{
				background-color: rgb(243, 243, 243);
				.list{
					list-style:none;
					padding:10px 0;
					position:relative;
				}
				.more{
					cursor: pointer;
					height: 25px;
					.mx_fc(15px,rgb(70, 147, 235));
					font-weight: bolder;
					text-align: right;
					padding-right: 5%;
				}
			}
		}
	}
	
}






</style>