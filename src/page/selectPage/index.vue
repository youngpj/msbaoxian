<template>
    <div id="active" class="page">
       <div class="container" :class="{bg1:tabInfo.selectedTab=='diy',
       bg2:tabInfo.selectedTab=='jingshi',
       bg3:tabInfo.selectedTab=='xingjiabi',
       bg4:tabInfo.selectedTab=='baiwan',
       bg5:tabInfo.selectedTab=='fangai'}">
           <div class="topTab">
               <div class="tab" :class="{'active':tabInfo.selectedTab=='diy'}" @click="selectTab('diy')">DIY定制</div>
               <div class="tab" :class="{'active':tabInfo.selectedTab=='jingshi'}" @click="selectTab('jingshi')">经适</div>
               <div class="tab" :class="{'active':tabInfo.selectedTab=='xingjiabi'}" @click="selectTab('xingjiabi')">性价比</div>
               <div class="tab" :class="{'active':tabInfo.selectedTab=='baiwan'}" @click="selectTab('baiwan')">百万医疗</div>
               <div class="tab fangai" :class="{'active':tabInfo.selectedTab=='fangai'}" @click="selectTab('fangai')">防癌</div>
           </div>

           <div class="con_list">
               <!-- 住院医疗保障 -->
               <div class="insure_items">
                   <p class="item_title">住院医疗保障 <span v-if="!insureItemShow" @click="shouwInsureItem">查看保障项目</span></p>
                    <transition name="expend-fade">
                        <div class="item_options" v-if="insureItemShow">
                            <p class="has"> 住院医疗</p>
                            <p class="has">住院前后门急诊</p>
                            <p class="has" :class="{'nothas':tabInfo.selected.Amount==6&&tabInfo.selected.deductible==0&&tabInfo.selected.scale==50}">扩展社保外用药</p>
                            <p class="has"  :class="{'nothas':tabInfo.selected.Amount==6&&tabInfo.selected.deductible==0&&tabInfo.selected.scale==50||
                            tabInfo.selected.Amount==12&&tabInfo.selected.deductible==0&&tabInfo.selected.scale==85}">特殊门诊</p>
                        </div>
                    </transition> 
               </div>
               <!-- 保障金额 -->
               <div class="insure_Amount">
                   <div class="insure_select"  >请选择 <p  @click="amountShow"><span>保障金额</span><img src="../../assets/image/eImg/select_tipicon.png" alt="" ></p></div>
                   <div class="Amount">
                       <div class="option" style="margin-left:0" :class="{'active':tabInfo.selected.Amount==6,'disable':tabInfo.selected.Amount_disable.indexOf(6)>-1}"  @click="selectAmount('6')">6万</div>
                       <div class="option"  :class="{'active':tabInfo.selected.Amount==12,'disable':tabInfo.selected.Amount_disable.indexOf(12)>-1}" @click="selectAmount('12')">12万</div>
                       <div class="option"  :class="{'active':tabInfo.selected.Amount==30,'disable':tabInfo.selected.Amount_disable.indexOf(30)>-1}" @click="selectAmount('30')">30万</div>
                       <div class="option"  :class="{'active':tabInfo.selected.Amount==50,'disable':tabInfo.selected.Amount_disable.indexOf(50)>-1}" @click="selectAmount('50')">50万
                           <img v-if="tabInfo.selected.Amount!=50" src="../../assets/image/eImg/select_hot1.png" alt="">
                           <img v-else src="../../assets/image/eImg/select_hot2.png" alt="">
                        </div>
                       <div class="option"  :class="{'active':tabInfo.selected.Amount==100,'disable':tabInfo.selected.Amount_disable.indexOf(100)>-1}" @click="selectAmount('100')">100万
                        <img v-if="tabInfo.selected.Amount!=100" src="../../assets/image/eImg/select_hot1.png" alt="">
                           <img v-else src="../../assets/image/eImg/select_hot2.png" alt="">
                       </div>
                   </div>
               </div>
               <!-- 年免赔额 -->
               <div class="insure_deductible">
                    <div class="insure_select" >请选择 <p @click="deductibleShow"><span>年免赔额</span><img src="../../assets/image/eImg/select_tipicon.png" alt=""></p> </div>
                    <div class="deductible">
                       <div class="option" style="margin-left:0" :class="{'active':tabInfo.selected.deductible==='0','disable':tabInfo.selected.deductible_disable.indexOf(0)>-1}"  @click="selectDeductible('0')">0元</div>
                       <div class="option" :class="{'active':tabInfo.selected.deductible==2,'disable':tabInfo.selected.deductible_disable.indexOf(2)>-1}"  @click="selectDeductible('2')">2千</div>
                       <div class="option" :class="{'active':tabInfo.selected.deductible==5,'disable':tabInfo.selected.deductible_disable.indexOf(5)>-1}"  @click="selectDeductible('5')">5千</div>
                       <div class="option" :class="{'active':tabInfo.selected.deductible==8,'disable':tabInfo.selected.deductible_disable.indexOf(8)>-1}"  @click="selectDeductible('8')">8千</div>
                       <div class="option" :class="{'active':tabInfo.selected.deductible==10,'disable':tabInfo.selected.deductible_disable.indexOf(10)>-1}"  @click="selectDeductible('10')">1万</div>
                   </div>
               </div>
               <!-- 赔付比例 -->
               <div class="insure_scale">
                   <div class="insure_select"  >请选择  <p @click="scaleShow"><span>赔付比例</span><img src="../../assets/image/eImg/select_tipicon.png" alt=""></p></div>
                    <div class="scale"> 
                       <div class="option" style="margin-left:0" :class="{'active':tabInfo.selected.scale==50,'disable':tabInfo.selected.scale_disable.indexOf(50)>-1}"  @click="selectScale('50')">50%</div>
                       <div class="option" :class="{'active':tabInfo.selected.scale==85,'disable':tabInfo.selected.scale_disable.indexOf(85)>-1}"  @click="selectScale('85')">85%</div>
                       <div class="option" :class="{'active':tabInfo.selected.scale==95,'disable':tabInfo.selected.scale_disable.indexOf(95)>-1}"  @click="selectScale('95')">95%</div>
                       <div class="option" :class="{'active':tabInfo.selected.scale==100,'disable':tabInfo.selected.scale_disable.indexOf(100)>-1}"  @click="selectScale('100')">100%</div>
                   </div>
               </div>
           </div>
           <div class="exceptInsure" :class="{active:tabInfo.selected.scale!==''&&tabInfo.selected.Amount>=50}">
                <p class="title">请选择额外保障</p>
                <p class="tiptop" > <img src="../../assets/image/eImg/suo.png"  alt=""> 住院医疗保额在50万及以上时可选</p>
                <div class="selectWarp">
                    <div class="t1">恶性肿瘤医疗保障<img src="../../assets/image/eImg/select_hot1.png" alt="">
                        <switch-group :labelarr="labelarr.ewai"  @input="changeExtraPro" v-model="extraProtection"/>
                    </div>
                    <p class="t2" v-if="tabInfo.selected.scale!==''&&tabInfo.selected.Amount>=50" ><span>{{tabInfo.selected.Amount}}</span>  万保额，0免赔，<span>{{tabInfo.selected.scale}}</span>%赔付</p>
                </div>
           </div>

           <div class="Insured">
                <p class="title">请选择被保人信息</p>
                <p class="t1">被保人有无社保<switch-group  :labelarr="labelarr.shebao" v-model="userCheckInfo.hasShebao"  @input="getTotalPayment" /></p>
                <p class="t2">被保人出生日期 <birtyday-selector  v-model="userCheckInfo.birthDate" ref="birthCheck" @input="getTotalPayment"></birtyday-selector></p>
           </div>
           <p class="moreDet">更多详情，请阅读<span  @click="toXuzhi" >《投保须知》</span> 和 <span @click="toProvision">《保险条款》</span></p>
       </div>
        <footer>
            <div class="footer-left-content">
                <div class="kefu" @click="televent">
                    <a href="tel:95596" >客服</a>
                </div>
                <!-- <div class="amounts" v-show="totalPayment"><span>￥</span>13</div> -->
                <div class="amounts"><span>￥</span>{{totalPayment}}<span style="color: #117EFF;" v-if="!moneyChange">起</span></div>
            </div>
            <div class="footer-right-btn active" @click="toinsure">立即投保</div>
        </footer>
        <!-- 保障金额提示 -->
        <tip-box :isshow="Amount_show" @cancle="Amount_show=false">
            <div slot="content" class="content_tip">
                <div class="toptext" >
                    <p class="boxtitle">保障金额</p>
                    <p>保障金额 是指本合同项下保险公司承担赔偿或给付保险金责任的最高限额。相同条件下，保额越高，被保险人能获得的 赔偿越高。</p>
                </div>
                <div class="bottomtext">
                    <p>* 选择不同额度的保障金额将影响年免赔额项和额外保障项 <span style="color:#c187ff">（恶性肿瘤医疗保障、质子重离子医疗保障）</span>    的可选性。</p>
                </div>
            
            </div>
        </tip-box>
        <!-- 年免赔额提示 -->
        <tip-box :isshow="deductible_show" @cancle="deductible_show=false">
            <div slot="content" class="content_tip">
                <div class="toptext" >
                    <p class="boxtitle">年免赔额</p>
                    <p>年免赔额 是指被保险人需自行承担，本合同不予赔偿的年度累计医疗费用。相同条件下，免赔额越低，被保险人能获得的 赔偿越高。</p>
                </div>
                <div class="bottomtext">
                    <p>* 被保险人从工作单位、除本合同之外的商业医疗保险、其他政府机构或者社会福利机构获得的医疗费用补偿可用于 抵扣免赔额。*选择不同的年免赔额将影响赔付比例项的可选性。</p>
                </div>
            
            </div>
        </tip-box>
        <!-- 赔付比例提示 -->
        <tip-box :isshow="scale_show" @cancle="scale_show=false">
            <div slot="content" class="content_tip">
                <div class="toptext" >
                    <p class="boxtitle">赔付比例</p>
                    <p>赔付比例越高，能获得的赔偿越高(扣除免赔额后），但所支付的保费也相对较高。</p>
                </div>
                <!-- <div class="bottomtext">
                    <p>赔付比例越高，能获得的赔偿越高(扣除免赔额后），但所支付的保费也相对较高。</p>
                </div> -->
            
            </div>
        </tip-box>
    </div>    
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>