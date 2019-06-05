const host = 'http://localhost:8080'
const apiList = {
    // 主页：查看新闻列表
    newsList:host.concat('/news/getAllByType'),
    // 新闻页：查看新闻详细内容
    newsData:host.concat('/news/getNewsInfoByNewsId'),
    // 新闻页：查看评论列表
    commentList:host.concat('/comment/CommentByNewsId'),
    // 新闻页：用户头像图片
    headPortraitUrl:host.concat('/user/getHeadPortraitUrlByUsername'),
    // 新闻页：查看回复列表
    replyList:host.concat('/reply/replyByCommentId'),
    // 用户信息
    login:host.concat('/user/login'),
    // 用户自己新闻列表
    userNewsList:host.concat('/news/getAllByUsername'),
    // 用户新增新闻
    addNews:host.concat('/news/addNews'),
    // 用户删除新闻
    deleteNews:host.concat('/news/deleteNews'),
    // 图片上传地址
    imgUpload:host.concat('/img/imgUpload'),
    // 更新新闻
    updateNews:host.concat('/news/updateNews'),
    // 增加评论
    addComment:host.concat('/comment/addComment'),
    // 删除评论
    deleteComment:host.concat('/comment/deleteComment'),
    // 增加回复
    addReply:host.concat('/reply/addReply'),
    // 删除回复
    deleteReply:host.concat('/reply/deleteReply'),
}
module.exports = apiList;