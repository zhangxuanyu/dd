<template>
    <div></div>
</template>

<script>
export default {
    data(){
        this.$router.replace({path:'/search?',query:{id: this.$route.query.id}})
        return{

        }
    }
}
</script>

<style scoped>

</style>