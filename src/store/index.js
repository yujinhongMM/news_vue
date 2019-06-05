import Vue from 'vue'
import Vuex from 'vuex'
import news from './modules/news'
import comment from './modules/comment'
import user from './modules/user'
Vue.use(Vuex)
export default new Vuex.Store({
    // 数据保存在state字段内 
    state: {
        // 当前用户
        currentUser:null,
        // 判断当前用户是否已经登录
        isLogin:false,
    },
    // 显示提交mutations，用来直接修改state里的数据
    mutations:{
        set_User(state,user){
            if(user){
                state.currentUser = user;
                state.isLogin = true;
            }else if(user == null){
                // 登出的时候，清空sessionStorage里的东西
                sessionStorage.setItem("userName",null);
                sessionStorage.setItem("userToken","");
                state.currentUser = null;
                state.isLogin = false;
            }
        }
    },
    // action与mutation很像，不同的是action里面提交的是mutation，并且可以异步操作业务逻辑
    actions:{
        get_User(context,user){
            context.commit("set_User",user);
        }
    },
    // 将方法提取出来
    getters:{
        currentUser:state => state.currentUser,
        isLogin:state => state.isLogin
    },
    modules:{
        news,
        comment,
        user
    }
})