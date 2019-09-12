<template>
    <div class="range-container">
        <div class="range-title"><img src="../assets/image/baozhang.png" >{{ title }}</div>
        <div class="checked-value" v-if="type == 1"><span>￥</span>{{ optArr1[value - 1] }}</div>
        <div class="checked-value" v-else-if="type == 2">{{ optArr2[value - 1] == 12 ? '1' : optArr2[value - 1] }}<span>{{ optArr2[value - 1] == 12 ? '年' : '个月'}}</span></div>
        <div class="input-range">
            <input type="range" v-model="rangeVal" @touchend="onTouchEnd" @click="onTouchEnd"/>
            <div class="progress" :style="{width: rangeVal + '%'}"></div>
            <div class="kedu-container">
                <div class="kedu-item" :class="{'active': rangeVal >= 0}" @click="onClickKedu(0)">
                    <label>{{ type == 1 ? '¥1,000' : '1个月'}}</label>
                </div>
                <div class="kedu-item" :class="{'active': rangeVal >= 25}" @click="onClickKedu(25)">
                    <label>{{ type == 1 ? '¥2,000' : '3个月'}}</label>
                </div>
                <div class="kedu-item" :class="{'active': rangeVal >= 50}" @click="onClickKedu(50)">
                    <label>{{ type == 1 ? '¥5,000' : '6个月'}}</label>
                </div>
                <div class="kedu-item" :class="{'active': rangeVal >= 75}" @click="onClickKedu(75)">
                    <label>{{ type == 1 ? '¥10,000' : '9个月'}}</label>
                </div>
                <div class="kedu-item" :class="{'active': rangeVal >= 100}" @click="onClickKedu(100)">
                    <label>{{ type == 1 ? '¥20,000' : '1年'}}</label>
                </div>
            </div>
            <div class="slider-thumb" :style="{left: rangeVal + '%'}"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'rangeGroup',
    data: function() {
        return {
            optArr1: ['1,000','2,000','5,000','10,000','20,000'],
            optArr2: ['1','3','6','9','12'],
            rangeVal: (this.value - 1) * 25
        }
    },
    props: ['title', 'type', 'value'],
    methods: {
        handleInput: function(evt) {
            this.$emit('input', evt.target.value);
        },
        onClickKedu: function(index) {
            this.rangeVal = index;
            this.$emit('input', Math.round(index / 25) + 1);
        },
        onTouchEnd: function(evt) {
            this.rangeVal = Math.round(evt.target.value / 25) * 25;
            this.$emit('input', Math.round(evt.target.value / 25) + 1);
        }
    },
    watch: {
        // 'rangeVal': function() {

        // }
    }
}
</script>
<style scoped>
.range-container{
    padding-top: .4rem;
    padding-bottom: .8rem;
    border-bottom: 1px solid #eee;
}

.range-title{
    text-align: center;
    font-size: .48rem;
    color: #333333;
    font-weight: 600;
}

.range-title img{
    width: .4rem;
    vertical-align: middle;
    margin-right: .133333rem;
    position: relative;
    top: -0.026667rem;
}

.checked-value{
    text-align: center;
    color: #FF9157 ;
    font-size: .746667rem;
    margin: .4rem auto .8rem;
}

.checked-value span {
    font-size: .373333rem;
}

.input-range{
    position: relative;
    text-align: center;
    width: 8.213333rem;
    height: 45px;
    margin: 0 auto;
    
}

input[type="range"]::-webkit-slider-thumb {
    /* -webkit-appearance: none; */
}  

input[type="range"]::-webkit-slider-runnable-track {
    height: .133333rem;
    border-radius: .106667rem; /*将轨道设为圆角的*/
    background: #FFF4EE;
}

input[type="range"]{
    position: absolute;
    top: .186667rem;
    left: 0;
    -webkit-appearance: none;
    outline: none;
    width: 100%;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: .8rem;
    width: .6rem;
    margin-top: -.32rem; /*使滑块超出轨道部分的偏移量相等*/
    background: #FFA12D; 
    box-shadow: 0 1px 6px 0 #FFCA8E;
    opacity: 0;
    border:none;    
    position: relative;
    z-index: 1;
}

.slider-thumb{
    position: absolute;
    top: 0;
    left: 0;
    width: .586667rem;
    height: .586667rem;
    background-color: #FCB299;
    background-image: url('../assets/image/thump.png');
    background-size: contain;
    box-shadow: 0 2px 6px 0 #FCB299;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, 0);
    
}

.kedu-container{
    position: absolute;
    width: 100%;
    height: .133333rem;
    left: 0;
    top: .24rem;
}

.kedu-item{
    position: absolute;
    top: -0.106667rem;
    width: .266667rem;
    height: .266667rem;
    border-radius: 50%;
    background: #FFDECD;
    transform: translate(-50%, 0);
}

.kedu-item::after{
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1.066667rem;
    height: 1.066667rem;
    transform: translate(-50%, -50%);
}

.kedu-item.active{
    background-color: #FF9157;
}

.kedu-item:nth-child(1){
    left: 0;
}

.kedu-item:nth-child(2){
    left: 25%;
}

.kedu-item:nth-child(3){
    left: 50%;
}

.kedu-item:nth-child(4){
    left: 75%;
}

.kedu-item:nth-child(5){
    left: 100%;
}

.kedu-item label{
    position: absolute;
    top: .586667rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: .373333rem;
    color: #333;
    white-space: nowrap;
}

.progress{
    position: absolute;
    top: .20rem;
    left: 0;
    height: .133333rem;
    background-color: #FF9157;
        
}
</style>