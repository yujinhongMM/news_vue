import http from '../../../api/http'
import apiList from '../../../api/apiList'
export default {
    // state:{
    //     // 评论列表
    //     commentList:{}
    // },
    // mutations:{
    //    // 设置评论列表
    //    set_CommentList(state, context) {
    //         state.commentList = context;
    //     }
    // },
    // actions:{
    //     // 获取评论列表
    //     async get_CommentList(context,commentData,replyPages) {
    //         let commentList = await http({
    //             method:'post',
    //             data:commentData,
    //             url:apiList['commentList']
    //         });
    //         // console.log(newsList.data)
    //         let len=commentList.data.list.length;
    //         for(let i=0;i<len;i++){
	// 			commentList.data.list[i].headPortraitUrl =await this.getHeadPortraitUrl(commentList.data.list[i].responder);
	// 			commentList.data.list[i].replyList = await this.getReplyList(replyPages,commentList.data.list[i].commentId);
	// 		}
    //         context.commit('set_CommentList', commentList.data);
    //     },
    //     // 获取头像
	// 	async getHeadPortraitUrl(username){
	// 		let head_param = new URLSearchParams();
    //             head_param.append('username', username);
    //             // 获取头像
    //             let headPortraitUrl = await http({
    //                 method:'post',
    //                 data:head_param,
    //                 url:apiList['headPortraitUrl']
	// 			});
	// 		return headPortraitUrl.data;
    //     },
    //     // 获取回复列表
	// 	async getReplyList(reply_page,commentId){
	// 		let param = new URLSearchParams();
    //         param.append('pageNo', reply_page.currentPage);
    //         param.append('pageSize', reply_page.size);
	// 		param.append('commentId', commentId);
	// 		let replyList =await http({
    //             method:'post',
    //             data:param,
    //             url:apiList['replyList']
	// 		});
	// 		let len=replyList.data.list.length;
    //         for(let i=0;i<len;i++){
	// 			replyList.data.list[i].headPortraitUrl =await this.getHeadPortraitUrl(replyList.data.list[i].responder);
	// 		}
    //        	return replyList.data;
	// 	}
    // },
    // getters:{}
}