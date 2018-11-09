<template>
    <div class="picbg" @click="close">
        <img src="../../static/closepic.png" alt="" class="closepic">
        <img :src="$store.state.picurl" alt="" class="theimg">
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        close(){
            this.$store.commit("changepicshow", false);
        }
    }
}
</script>

<style scoped>
.picbg{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    top: 0px;
    left: 0px;
    position: fixed;
    z-index: 999;
}
.theimg{
    width: 1000px;
    margin-top: 200px;
}
.closepic{
    float: right;
    margin-top: 30px;
    margin-right: 30px;
    cursor: pointer;
}
</style>
