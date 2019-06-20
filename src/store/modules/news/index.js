import http from '../../../api/http'
import apiList from '../../../api/apiList'
export default {
    state:{
        // 新闻列表
        newsList:{},
        // 新闻详细内容
        newsData:{},
        // 用户自己新闻列表
        userNewsList:{},
        // 新闻热度排行列表
        hotNewsList:{}
    },
    mutations:{
        // 设置新闻列表
        set_NewsList(state, context) {
            state.newsList = context;
        },
        // 设置新闻详细内容
        set_NewsData(state, context) {
            state.newsData = context;
        },
        set_UserNewsList(state,context){
            state.userNewsList = context;
        },
        set_HotNewsList(state,context){
            state.hotNewsList = context;
        }
    },
    actions:{
        // 获取新闻列表
        async get_NewsList(context,data) {
            let newsList = await http({
                method:'post',
                data:data,
                url:apiList['newsList']
            });
            // console.log(newsList.data)
            context.commit('set_NewsList', newsList.data);
        },
        // 获取新闻详细内容
        async get_NewsData(context,data) {
            let newsData = await http({
                method:'post',
                data:data,
                url:apiList['newsData']
            });
            // console.log(newsData.data)
            context.commit('set_NewsData', newsData.data);
        },
        // 获取用户自己新闻列表
        async get_UserNewsList(context,data) {
            let userNewsList = await http({
                method:'post',
                data:data,
                url:apiList['userNewsList']
            });
            context.commit('set_UserNewsList', userNewsList.data);
        },
        // 获取新闻热度排行列表
        async get_HotNewsList(context){
            let hotNewsList = await http({
                method:'post',
                data:null,
                url:apiList['hotNewsList']
            });
            context.commit('set_HotNewsList',hotNewsList.data)
        }
    },
    getters:{}
}