<template>
    <div class="loading" :style="{opacity:opct,paddingLeft:theleft+'px'}">
            <div class="cirle"></div>
            <div class="radis"></div>
    </div>
</template>

<script>
export default {
   data(){
       return{
           opct:1,
           theleft:0
       }
   },
   computed:{
       theopct(){
           return this.$store.state.loadopacty
       },
       thefirstflag(){
           return this.$store.state.themenuflag
       }
   },
   watch:{
       theopct(n,o){
           if(n == false){
               setTimeout(()=>{
                   var bbc = setInterval(()=>{
                       if(this.opct<=0.1){
                           clearInterval(bbc)
                           this.$store.commit('changeloadflge',false)
                           this.opct = 1
                       }
                       this.opct = this.opct - 0.1
                   },30)

               },500)
           }
       },
       thefirstflag(n,o){
           this.forflag(n)
       }
   },
   created(){
       this.forflag(this.$store.state.themenuflag)
   },
   methods:{
       therouter(width){
           if(this.$route.path == '/'||this.$route.path == '/rank'||this.$route.path == '/num'||this.$route.path == '/money'||this.$route.path == '/use'||this.$route.path == '/search'||this.$route.path == '/report'){
                this.theleft = width
            }else if(this.$route.path == '/detail'||this.$route.path == '/user'||this.$route.path == '/trade'||this.$route.path == '/usedapp'||this.$route.path == '/chaindetail'||this.$route.path == '/chainuser'||this.$route.path == '/chaintrade'||this.$route.path == '/chainusedapp'||this.$route.path == '/chaindapp'){
                this.theleft = width + 220
            }
       },
       forflag(aa){
           if(aa){
               this.therouter(250)
           }else{
               this.therouter(70)
           }
       }
   }

}
</script>

<style scoped>
.loading{
    width: 100%;
    height: 100%;
    background-color: #eff3f6;
    top: 0px;
    left: 0px;
    position: fixed;
    z-index: 99;
}

.cirle{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 46px;
    height: 46px;
    box-sizing: border-box;
    margin-top: -23px;
    margin-left: -23px;
    border-radius: 50%;
    opacity: 0.6;
    border: 3px solid #49a5fb;
    border-left-color: #eff3f6;
    border-right-color: #eff3f6;
    animation: round 1s linear infinite;
}
.radis{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    margin-top: -8px;
    margin-left: -8px;
    border-radius: 50%;
    background-color: #49a5fb;
    opacity: 0.3;
}

@keyframes round {
    from{
        transform:rotate(0deg);
    }
    to{
        transform:rotate(360deg);
    }
}
</style>
