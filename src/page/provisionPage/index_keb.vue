/*
 * @Author: Yan Yuanfeng 
 * @Date: 2018-10-11 11:03:40 
 * @Last Modified by: Yan Yuanfeng
 * @Last Modified time: 2018-12-17 16:40:13
 * @descript 导入条款的json格式，渲染对应条款页面样式
 */
<template>
<div class="provision">
    <div id="top"></div>
    <div class="pagewarp">
        <div class="pagebg">
            <div class="firstpage" style="height:15.5rem">
                <h3 class="provision_title" style="padding-top:0.5333rem">民生人寿保险股份有限公司 </h3>
                <h3 class="provision_title" style="padding-bottom:0.48rem">民生康e保费用补偿医疗保险条款</h3> 
                <p class="tip ">本阅读指引有助于您理解条款，对本合同内容的解释以条款为准。</p>
                <div class="guide">
                    <p class="title_1 title_weight">您拥有的重要权益：</p>
                    <p class="note"><span class="note_t">被保险人享受本保险合同提供的保障</span> <span class="note_a" v-anchor="2.3" >第2.3条</span></p>
                </div>
                <div class="guide">
                    <p class="title_1 title_weight">您应当特别注意的事项：</p>
                    <p class="note"><span class="note_t">在某些情况下，本公司不承担保险责任</span> <span class="note_a" v-anchor="2.6" >第2.6条</span></p>
                    <p class="note"><span class="note_t">退保会给您造成一定的损失，请您慎重决策</span> <span class="note_a" v-anchor="5.1" >第5.1条</span></p>
                    <p class="note"><span class="note_t">您有如实告知的义务</span> <span class="note_a" v-anchor="6.2" >第6.2条</span></p>
                    <p class="note"><span class="note_t">本公司对一些重要术语进行了解释，并作了显著标识，请您注意</span> <span class="note_a" v-anchor="7" >第7条</span></p>
                </div>
                <p class="remind" >
                        <img src="../../assets/image/eImg/warning.png" alt="">  <span>条款是保险合同的重要内容，为充分保障您的权益，请您仔细阅读本条款。</span>
                </p>
            </div>

            <div class="catalog clearfix">
                <h4 class="title_1">条款目录</h4>
                <div   style="height:15.5rem" class="catalog_warp" v-for="(col_item,col_key) in catalog.col" :key="col_key" :class="{rightcata : col_key%2==1,leftcata : col_key%2==0,noAfter:(catalog.col-2)<=col_key}" >
                    <div v-for="(item , key) in catalog.catalogArr.slice((col_item-1) * catalog.colnum,(col_item-1) * catalog.colnum + catalog.colnum)" :key = "item.number" >
                        <p v-if="item.level==1" class="catalog_item title_weight">{{item.number}} {{item.title}}</p>
                        <p v-if="item.level==2"  class="catalog_item catalog_item_sub" v-anchor="item.number">{{item.number}} {{item.title}}</p>
                        <p v-if="item.level==3 &&key!=0" class="line" ></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
   <div class="content">
       <p style="    font-size: 0.3733rem;    color: #333;">在本条款中，“您”指投保人，“我们”、“本公司”均指民生人寿保险股份有限公司。</p>
       <!-- 一级 -->
       <div class="content_part"  v-for="(item , key) in json" :key = "key">
            <h4 class="title_1 title_weight"  :id="'anchor-'+item.number" >{{item.title}}</h4>
            <!--二级 -->
            <div class="content_title" v-if="item.children" v-for="(item_sub,key_sub) in item.children" :key="key_sub" >
                <p :id="'anchor-'+item_sub.number" >{{item_sub.number}}  {{item_sub.title}}</p>
                <div class="content_det" v-for="(part , part_key) in item_sub.content" :key="part_key">
                    <p v-if="!!part.text">{{part.text}}</p>
                    <div v-if="!!part.img" class="list">
                        <img  :src="part.img" alt="">
                    </div>
                </div>
                <!-- 三级 -->
                <div class="content_title" v-if="item_sub.children" v-for="(item_three,key_three) in item_sub.children" :key="key_three" >
                    <p :id="'anchor-'+item_three.number" >{{item_three.number}}  {{item_three.title}}</p>
                    <div class="content_det" v-for="(part_three , ket_part_three) in item_three.content" :key="ket_part_three">
                        <p v-if="!!part_three.text">{{part_three.text}}</p>
                        <div v-if="!!part_three.img" class="list">
                            <img  :src="part_three.img" alt="">
                        </div>
                    </div>
                    <!-- 四级 -->
                     <div class="content_title" v-if="item_three.children" v-for="(item_four,key_four) in item_three.children" :key="key_four" >
                        <p style="padding-left:5px" >◇   &nbsp; {{item_four.title}}</p>
                        <div class="content_det" v-for="(part_four , ket_part_four) in item_four.content" :key="ket_part_four">
                            <p v-if="!!part_four.text">{{part_four.text}}</p>
                            <div v-if="!!part_four.img" class="list">
                                <img  :src="part_four.img" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
       </div>
   </div>
   <div class="bottomfixed">
    <img v-if="showTopBtn==true" src="../../assets/image/eImg/toTop.png" alt="totop" @click="top" >
    <a :href="tiaokuan"  v-if="!isIos"   >
        <img src="../../assets/image/eImg/download.png" alt="download" >
    </a>
   </div>
   <section class="imgzoom_pack">
    		<div class="imgzoom_x">X</div>
    		<div class="imgzoom_img"><img src="" /></div>
    </section>
</div>
</template>
<script>
import provision_json from '../../assets/provisionkeb.js' 
import tiaokuan from "@/assets/doc/baoxiantiaokuan.pdf";
import ImagesZoom from "@/lib/js/scale.js"
export default {
    name: 'Provisionkeb',
    isPage: true,
    title:'保险条款',
    data(){
       return{
            isIos:false,
           tiaokuan:tiaokuan,
            json:provision_json,
            // clientHeight:document.body.clientHeight,
            catalog:{//目录
                catalogArr:[],//[{title:'xx',number:'1'},{sun_title:'yy',number}]
                col:1,//列数
                colnum:17//每列目录标题数
            },
            showTopBtn:false,
       }
    },
    directives: {
        anchor : {      
            inserted:function(el,binding){
                el.onclick = function(){
                    document.getElementById('anchor-'+binding.value).scrollIntoView() 
                }
            }
        }
    },
    willEnterPage(){
        this.adjustJson(this.json)
        this.catalog.col=Math.ceil(this.catalog.catalogArr.length/this.catalog.colnum)

        // 判断是否是ios 如果是就不显示下载按钮 
        this.isIos=/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) ? true :false
        // 微信内屏蔽了文件的下载，必须拼接完整的下载路径
        // this.tiaokuan =`${location.origin}${location.pathname}${this.tiaokuan}`
    },
    didEnterPage(){
        document.getElementsByClassName('provision')[0].addEventListener('scroll',(e)=>{
            this.showTopBtn =e.target.scrollTop>1000
        })
        
       ImagesZoom.init({
            "elem": ".list"
        });   
    },
    
    methods: {
        // 文件下载
        exportfile(){
            window.location.href= this.tiaokuan
        },
        // 整理josn,添加编号
        adjustJson(arr,key){
            var key = key||'0'
            console.log(key)
            // 超过三级目录不进行遍历子标题
            if(key.split('.').length>=3){
                return
            }
            arr.forEach((element,index) => {
                // this.count++
                let number = key=='0'?index+1+"":key+'.'+(index+1)
                if(key=='0'){
                    if(index!='0'){
                        this.catalog.catalogArr.push({title:element.title,number:number,level:3})//添加分割线
                    }
                    this.catalog.catalogArr.push({title:element.title,number:number,level:1})
                    if(element.title.length>9){
                             this.catalog.catalogArr.push({title:"",number:"",level:4})//添加一个空的目录作为计数，避免目录文字太多换行导致该列超出一页而溢出
                    }
                }else{//子目录
                    this.catalog.catalogArr.push({title:element.title,number:number,level:2})
                    if(element.title.length>9){
                        this.catalog.catalogArr.push({title:"",number:"",level:4})//添加一个空的目录作为计数，避免目录文字太多换行导致该列超出一页而溢出
                    }
                }
                element.number= number
                if(element.children!=null){
                    this.adjustJson(element.children,number)
                }
            });
        },
        /**
         * 回到顶部
         */
        top(){
            document.getElementById('top').scrollIntoView() 
             this.showTopBtn=false
        }
    },
    computed: {
    }
}
</script>
<style scoped>
.provision {
  /* padding: 0.2667rem 0.4533rem; */
  overflow: auto;
  overflow-x: hidden;
  min-height: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
}
.pagewarp{
    background-color:  #919191;
    padding: 0.16rem ;
}
.pagebg{
    background-color: #fff;
    padding:0 0.2667rem;
}
.firstpage{
    position: relative;
}
.provision_title{
    font-weight: 500;
    font-size: 0.4266rem;
    color: #666666;
    text-align: center;
    line-height: 0.7467rem;
}
.guide{
    padding-bottom: 0.2667rem;
}
.tip{
    font-size: 0.3734rem;
      color: #666666;
      line-height: 0.5333rem;
      margin: 0 auto 0.2667rem;     
}
.note{
    font-size: 0.3734rem;
    color: #2A2A2A;
    letter-spacing: 0;
    text-align: justify;
    line-height: 0.8534rem;
    position: relative;
    z-index: 2;
    /* background-image: url("../../assets/image/eImg/dian.png") ;
    background-position-y: center;
    background-repeat-y: no-repeat;
    background-size: 0.2133rem; */
}
.note::before{
    content: '';    
     background: url("../../assets/image/eImg/dian.png") repeat-x;
    background-position-y: center;
    /* background-repeat-y: no-repeat; */
    background-size: 0.2133rem;
    display: inline-block;
    width: 100%;
    height: 0.8533rem;
    position: absolute;
    bottom: 0;
}
.note span{
    position: relative;
    z-index: 1;
    display: inline;
    background-color: #fff;
    padding-right: 0.1333rem;
}
.note .note_a{
     position: relative;
    z-index: 1;
    /* display: inline; */
    background-color: #fff;
    float: right;
    color: #6f9ee5;
    padding-left:0.1333rem;
    padding-right: 0;
}   
.remind{
    font-size: 0.3734rem;
    color: #666666;
    line-height: 0.64rem;
    margin-top: 0.9333rem;
    /* position: absolute; */
    /* bottom:1.0667rem; */
}
.firstpage::after{
    content: "";
    width: 120vw;
    height: 0.1333rem;
    background-color: #919191;
    display: block;
    position: absolute;
    left: -0.4rem;
    bottom: 0.5333rem;
}
.remind img{
    height: 0.4266rem;
    vertical-align: text-bottom;
    line-height: 0.64rem;

}
.title_1 {
  font-size: 0.3734rem;
  color: #000;
  line-height: 0.8534rem;
  font-weight: 500; 
}
.title_1::before {
  content: "";
  width: 0.0534rem;
  height: 0.2933rem;
  background-color: #ff8722;
  display: inline-block;
  vertical-align: text-bottom;
  margin: 0rem 0.1333rem 0.08rem 0;
}
.catalog{
    box-sizing: border-box;
}
.catalog_warp{
    padding-top: 0.2667rem;
}
.leftcata{
    float: left;
    width: 50%;
    box-sizing: border-box;
    padding-right: 0.2667rem;
     position: relative;
}

.rightcata{
     float: left;
       box-sizing: border-box;
    width: 50%;
    padding-left: 0.2667rem;
    padding-right: 0;
    border-left: 0.0267rem solid #EBEBEB;
   
}
.leftcata::after{
    content: "";
    width: 120vw;
    height: 0.1333rem;
    background-color: #919191;
    display: block;
    position: absolute;
    left: -0.2667rem;
    bottom:0rem;
}
.noAfter::after{
    display: none
}
.line{
    border-bottom: 0.0267rem solid  #EBEBEB;
    margin: 0.4267rem 0;
}

.catalog_item {
     /* padding-left: 0.2667rem; */
     box-sizing: border-box;
    line-height:  0.8533rem;
    /* min-height: 0.8533rem; */
  font-size: 0.3734rem;
  color: #2a2a2a
}
.catalog_item_sub {
  color: #6f9ee5;
}
.content{
    padding: 0.4533rem;
}
.content_part{
    margin-top: 0.5867rem
}
.content_title{
    margin-top: 0.2667rem;
    font-size: 0.3734rem;
     color: #2A2A2A;
     line-height: 0.64rem;
}
.content_det{
    font-size: 0.3734rem;
    color: #666;
    letter-spacing: 0;
    text-align: justify;
    line-height: 0.64rem;
}
.content_det img{
    width: 100%;
}
.clearfix::after{
    content:".";display:block;height:0;clear:both;visibility:hidden
}
.bottomfixed{
    position: fixed;
    bottom: 39px;
    right: 30px;
    width: 40px;
}
.bottomfixed img{
    width: 40px;
}


/*弹框样式*/
.imgzoom_pack{
	width:100%;
	height:100%;
	position:fixed;
	left:0;
	top:0;
	background:rgba(0,0,0,.7);
	display:none;
}
.imgzoom_pack .imgzoom_x{
	color:#fff;
	height:30px;
	width:30px;
	line-height:30px;
	background:#000;
	text-align:center;
	position:absolute;
	right:5px;
	top:5px;
	z-index:10;
	cursor:pointer;
}
.imgzoom_pack .imgzoom_img{
	width:100%;
	height:100%;
	position:absolute;
	left:0;
	top:0;
	overflow:hidden;
}
.imgzoom_pack .imgzoom_img img{
	width:100%;
	position:absolute;
	top:50%;
}
.title_weight{
    color:#666;
    font-weight: 600;
}
</style>