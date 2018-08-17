<template>
    <div>
        <go-search class="top"></go-search>
        <the-menu class="menu"></the-menu>
        <router-view class="cont"/>
        <the-foot class="foot" :style="{paddingLeft:theleft}"></the-foot>
    </div>
</template>

<script>
import goSearch from './gosearch'
import theMenu from './menu'
import theFoot from './allfoot'
export default {
    components:{
                goSearch,
                theMenu,
                theFoot
            },
    data(){
        return{
            theleft:''
        }
    },
    computed:{
        inleft(){
            return this.$store.state.themenuflag
        }
    },
    watch:{
        inleft(n,o){
            this.cglf(n)
        },
       
    },  
    created(){
        this.cglf(this.$store.state.themenuflag)
    },
    methods:{
        cglf(n){
            if(n){
                this.theleft='330px'
            }else{
                this.theleft='70px'
            }
        },
    }    
            
}
</script>

<style scoped>
.top{
    position: fixed;
    top: 0px;
    left:0px;
    z-index: 9999;
}
.menu{
    margin-right: 10px;
    position: fixed;
    top: 60px;
    left: 0px;
}
.cont{
    overflow: hidden;
}
.foot{
    padding-left: 300px;
    box-sizing: border-box;
    margin-top: 60px;
}
</style>

