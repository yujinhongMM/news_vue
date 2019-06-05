import http from '../../../api/http'
import apiList from '../../../api/apiList'
export default {
    state:{
        headPortraitUrl:null
    },
    mutations:{
        // 设置用户头像要显示的地址
        set_HeadPortraitUrl(state, context) {
            state.headPortraitUrl = context;
        }
    },
    actions:{
        // 获取用户头像要显示的地址
        async get_HeadPortraitUrl(context,data) {
            let headPortraitUrl = await http({
                method:'post',
                data:data,
                url:apiList['headPortraitUrl']
            });
            context.commit('set_HeadPortraitUrl', headPortraitUrl.data);
        }
    },
    getters:{}
}