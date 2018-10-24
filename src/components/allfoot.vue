<template>
    <div class="foot" :style="{paddingLeft:leftgap}">
        <div class="left">
            Copyright © 2018 DappData
        </div>
       <div class="right cur">
            {{tipsarr[0][$store.state.alllang]}}：contact@dappdata.io 
            <div class="exchange_tipe" v-show="$store.state.alllang == 0">
                {{tipsarr[1][$store.state.alllang]}}
            </div>
            <div class="exchange_tipe_en" v-show="$store.state.alllang == 1">
                {{tipsarr[1][$store.state.alllang]}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            leftgap:'70px',
            tipsarr:[['联系我们','CONTACT US'],['如果您有任何意见和建议，或希望与网站进行业务合作，可通过此邮箱联系我们','If you have any comments or Suggestions or wish to do business with the website, please contact us through this email']]
        }
    },
    computed:{
        flgmenu(){
            return this.$store.state.themenuflag
        }
    },
    watch:{
        flgmenu(n,o){
            this.leftpad(n)
        },
        '$route' (to, from) {
            this.leftpad(this.$store.state.themenuflag)
        },
    },
    created(){
        this.leftpad(this.$store.state.themenuflag)
    },
    methods:{
        leftpad(flag){
            if(this.$route.path == '/detail'||this.$route.path == '/user'||this.$route.path == '/trade'||this.$route.path == '/usedapp'||this.$route.path == '/chaindetail'||this.$route.path == '/chainuser'||this.$route.path == '/chaintrade'||this.$route.path == '/chaindapp'||this.$route.path == '/chainuse'){
                if(flag){
                    this.leftgap = '470px'
                }else{
                    this.leftgap = '290px'
                }
            }else{
                if(flag){
                    this.leftgap = '250px'
                }else{
                    this.leftgap = '70px'
                }
            }
        }
    }
};
</script>

<style scoped>
.foot {
  width: 100%;
  line-height: 86px;
  text-align: center;
  height: 86px;
  color: #a5aac0;
  font-size: 12px;
  background-color: #fafbfc;
}
.left{
    float: left;
    margin-left: 30px;
}
.right{
    float: right;
    margin-right: 30px;
    position: relative;
}
.right:hover .exchange_tipe{
    display: block;
}
.right:hover .exchange_tipe_en{
    display: block;
}
.exchange_tipe,.exchange_tipe_en{
    display: none;
    width: 280px;
	height: 92px;
    padding: 20px;
    box-sizing: border-box;
    top: -78px;
    left: -100px;
    position: absolute;
	background-color: #25304c;
	box-shadow: 3px 2px 10px 0px 
		rgba(37, 48, 76, 0.3);
    font-size: 12px;
	line-height: 30px;
	letter-spacing: 1px;
	color: #b4bbce;
    z-index: 100;
}
.exchange_tipe_en{
    line-height: 20px;
    top: -108px;
    left: -76px;
    height: 120px;
}
</style>
