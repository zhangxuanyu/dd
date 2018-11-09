import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        moneyty:0,
        requesttime:'',
        close:true,
        dapptype:0,
        themenuflag:true,
        requrl:'http://service.dappdata.io',
        appid:'',
        // 语言
        alllang:1,
        //记录页码
        yourpage:1,
        //控制loading
        loadflag:true,
        loadopacty:true,
        //控制详情图片显示
        picshowflag:false,
        picurl:''
        
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
        changemenuflag(state,meflg){
            state.themenuflag = meflg
        },
        falsemenu(state,ff){
            state.themenuflag = ff
        },
        theappid(state,id){
            state.appid = id
        },
        changlang(state,lang){
            state.alllang = lang
        },
        savepage(state,page){
            state.yourpage = page
        },
        changeloadflge(state,page){
            state.loadflag = page
        },
        changeloadopacty(state,page){
            state.loadopacty = page
        },
        changepicshow(state,ctl){
            state.picshowflag = ctl
        },
        changeurl(state,url){
            state.picurl = url
        }
    }
})