<template>

    <transition name="zoomIn">
    <div class="tip-box" v-if="isshow" >
        <div class="box">
           <slot name="content"></slot> 
            <div class="cancle" @click="changeShow"></div>
        </div>
    </div>
     </transition>   
</template>
<script>
export default {
    name: 'tipBox',
    data(){
       return{

       }
    },
    props: {
        isshow:{
            type:Boolean,
            default(){
                return false
            }
        }
        // title:{
        //     type: String,
        //     default () {
        //      return ""
        //     }
        // },
        // toptext: {
        //     type: String,
        //     default () {
        //      return ""
        //     }
        // },
        // bottomtext: {
        //     type: String,
        //     default () {
        //      return ""
        //     }
        // },

    },
    methods: {
     changeShow(){
         this.$emit('cancle')
     },
    },
    computed: {
    }
}
</script>
<style scoped>
.tip-box{
    position: fixed;   
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    z-index: 12;
}
.box {
    width: 315px;
    margin:105px auto 0;
    position: relative;
  
}
.cancle{
    position: absolute;
    bottom:10px;
    width: 30px;
    height: 30px;
    background: url("../assets/image/eImg/cha.png") no-repeat center ;
    background-size: 18px 18px;
    z-index: 1;
    border: 1px solid #fff;
    left: 0;
    right: 0;
    margin: 0px auto;
    bottom: -40px;
    border-radius: 50%;
}
/* 列表展开过度效果 */
.zoom-out-enter-active {
    transition: all .2s ease;
  }
.expend-fade-leave-active {
    transition: all .2s ease;
  }
.expend-fade-enter, .expend-fade-leave-to
  /* .expend-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-10px);
    opacity: 0;
  }

</style>