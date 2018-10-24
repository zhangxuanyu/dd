<template>
    <div id="handout_wrap_inner" :style="{height:'1000px'}"></div>
</template>


<script>
import '../../static/jquery.media.js'
export default {
    data(){
        return{
            theheight:1000,
            thewidth:'',
            change:''
        }
    },
    created(){
        console.log(window.innerHeight)
        this.theheight = window.innerHeight 
        this.thewidth = window.innerWidth
        console.log(this.$route.query.id)
    },
    mounted(){
        $('#handout_wrap_inner').media({
                width: (this.thewidth - 4) + 'px',
                height: (this.theheight - 10) + 'px',
                autoplay: true,
                src:pdfarr[parseInt(this.$route.query.id)].src,
            });
         $(window).on("resize", ()=> {
            this.change = document.body.clientWidth;
        });
        console.log(this.$route.query.lang)
        console.log(pdfarr[this.$route.query.id].title[this.$route.query.lang])
        document.title = pdfarr[this.$route.query.id].title[this.$route.query.lang]
    },
    watch:{
        change(){
            this.iframesize()
        }
    },
    methods:{
        iframesize(){
            this.theheight = window.innerHeight 
            this.thewidth = window.innerWidth
            $('#handout_wrap_inner').media({
                width: (this.thewidth - 4) + 'px',
                height: (this.theheight - 10) + 'px',
                autoplay: true,
                src:'http://dappdata.io/report/1/1.pdf',
            });
        }
    }
}
</script>

<style scoped>
#handout_wrap_inner{
	width: 100%;
	height: 100%;
}

</style>
