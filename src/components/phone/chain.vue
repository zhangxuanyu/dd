<template>
    <div class="out">
        <div class="report_out">
            <div class="report_long" >
                <div class="report_in"  v-for="(item,index) in chainarr" :key="index" @click="changechain(index)" :style="nowchain == index?{fontSize:'0.4rem',color:'#26262f'}:{}">
                  {{item}}
                    <div class="bot" v-if="nowchain == index"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            chainarr:['ETH','EOS','NAS','TRON','NEO','QTUM','GXCHAIN'],
            //选择
            nowchain:0
        }
    },
    created(){
        this.nowchain = this.$store.state.moneyty
    },
    mounted(){
        var long_length = 0
        this.chainarr.forEach((e,index) => {
            long_length = long_length + $('.report_in')[index].offsetWidth + 26
        });
        $('.report_long')[0].style.width = long_length + 20 +'px'
    },
    methods:{
        changechain(index){
            this.nowchain = index
            this.$store.commit('changemoneyty',index)
        }
    }
}
</script>

<style scoped  lang="scss">
.out{
    position: fixed;
    width: 100%;
    z-index: 98;
}
.report_out{
    background-color: #fff;
    height: 0.86rem;
    overflow-x: scroll;
    line-height: 0.86rem;
    margin-top: -0.5rem;
    margin-left: -0.3rem;
    margin-right: -0.3rem;
}
.report_long{
    overflow: hidden;
    height: 0.86rem;
    padding: 0 0.13rem;
}
.report_in{
    font-size: 0.3rem;
	color: #5d5d63;
    float: left;
    margin: 0 0.26rem;
    position: relative;
}
.bot{
    width: 0.2rem;
	height: 0.06rem;
	background-color: #2a79f9;
    position: absolute;
    bottom: 0rem;
    left:50%;
    margin-left: -0.1rem;
}
</style>
