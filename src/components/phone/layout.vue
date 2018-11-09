<template>
    <div>
        <ph-head></ph-head>
        <router-view  class="cont" :style="{minHeight:height}"/>
        <ph-foot></ph-foot>
    </div>
</template>

<script>
import phHead from './phhead'
import phFoot from './phfoot'
export default {
    components:{
                phHead,
                phFoot
            },
    data(){
        return{
            height:''
        }
    },
    created(){
        this.height = document.documentElement.clientHeight + 'px'
    }
}
</script>

<style scoped>
.cont{
    padding: 1.7rem 0.3rem;
    padding-bottom: 1.2rem;
}
</style>
