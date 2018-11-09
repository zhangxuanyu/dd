<template>
    <div>
        <p class="title">{{titlearr[$store.state.alllang]}}</p>
        <div class="box"  v-for="(item,index) in arr" :key="index" >
        <a :href="item.src">
            <div class="content_img" :style="{background: 'url('+item.img_report+') no-repeat',backgroundSize:'cover'}">

            </div>
            <p>{{item.title[$store.state.alllang]}}</p>
            <p>{{item.time}}</p>

        </a>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            titlearr:['研究报告','Report'],
            arr:[]
        }
    },
    created(){
        this.arr = pdfarr
    },
    methods:{
        gotoreport(id){
        // const {href} = this.$router.resolve({
        //             name: 'pdf',
        //             path:'/pdf',
        //             query: {
        //             id:id,
        //             lang:this.$store.state.alllang
        //             }
        //         })
        //     window.open(href, '_blank')

        }
    }
}
</script>

<style scoped>
a{
    text-decoration: none;
    outline: none;
}
.title{
    font-size: 0.36rem;
	color: #525864;
    text-align: left;
    font-weight: 600;
    margin-bottom: 0.4rem;
}
.box{
	height: 5rem;
	background-color: #ffffff;
	box-shadow: 3px 2px 10px 0px 
		rgba(37, 48, 76, 0.08);
    margin-bottom: 0.4rem;
    text-align: left;
}
.box p{
    line-height: 0.7rem;
    padding-left: 0.4rem;
}
.content_img{
    width: 100%;
    height: 3.6rem;
}
.box p:nth-of-type(1){
    font-size: 0.3rem;
	color: #464a58;
}
.box p:nth-of-type(2){
    font-size: 0.26rem;
	color: #797b8e;
}
</style>
