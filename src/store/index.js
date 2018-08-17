import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        moneyty:0,
        requesttime:'',
        close:false,
        dapptype:0,
        themenuflag:true,
        requrl:'http://service.dappdata.io',
        appid:'',
        // 语言
        alllang:0,
        
    },
    mutations:{
        changemoneyty(state,ploy){
            state.moneyty = ploy
            console.log(state.moneyty)
        },
        gettime(state,time){
            state.requesttime = time
            console.log(state.requesttime)
        },
        changeclose(state){
            state.close = !state.close
        },
        getdapptype(state,type){
            state.dapptype = type
        },
        changemenuflag(state){
            state.themenuflag = !state.themenuflag
        },
        falsemenu(state,ff){
            state.themenuflag = ff
        },
        theappid(state,id){
            state.appid = id
        },
        changlang(state,lang){
            state.alllang = lang
        }
    }
})