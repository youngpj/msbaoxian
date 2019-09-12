<template>
    <div id="page" class="page" ref="page">

        <div class="banner">
            <div class="bgimg bgimg1">
                <p class="bg1_t1">老司机随e保</p>
                <p class="bg1_t2">成为每个人的健康保障</p>
            </div>
            <p class="agelimit">适用人群28天-60周岁，保障期限1年</p>
            <div class="bgimg bgimg2">
                <p class="text bg2_t1">DIY定制</p>
                <!-- <p class="text bg2_t2">质子重离子</p> -->
                <p class="text bg2_t3">防范肿瘤</p>
                <p class="text bg2_t4">0免赔</p>
                <p class="text bg2_t5">100%赔付</p>
                <p class="text bg2_t6">百万保额</p>
                <p class="text bg2_t7">经济实惠</p>
                <p class="text bg2_t8">高性价比</p>
                <p class="text bg2_t9">保额自定</p>
            </div>
            <div class="bgimg bgimg3">
                <img src="../../assets/image/eImg/select_san.png" alt="" class="bg3_san">
                <div class="bg3_top">
                   <p>“老司机随e保”统统都能满足！</p>
                </div>
                <div class="bg3_guang">
                    <p>保额可选</p>
                    <p>免赔额可选</p>
                    <p>赔付比例可选</p>
                    <p>额外保障项可选</p>
                </div>
                
            </div>
        </div>
        <div style=" background: #797efc;overflow:hidden">
            <div class="questionlist">
            <div class="tip tip1" :class="{ 'active': showtip1||showtip2 }">
                <!-- {{this.showTips1}} -->
                <p @click="showTips1" class="tip-title" >理赔说明 <img :class="{'active':showtip1}" src="../../assets/image/eImg/arrow.png" alt="arrow"/></p>
                 <transition name="expend-fade">
                        <div v-if="showtip1" class="item_warp des">
                            <div class="line"></div>
                            <p class="dot">第1步：理赔报案</p>
                            <p>通过民生健康95596公众号在线申请理赔</p>
                            
                            <p class="dot">第2步：提交理赔资料</p>
                            <p>请您将理赔材料邮寄至：上海市浦东新区陆家嘴西路99号18楼（民生健康险事业部）</p>

                            <p class="dot">第3步：完成理赔</p>
                            <p>我们会根据审核结果将理赔款项支付到受益人指定账户</p>
                            
                        </div>
                 </transition>
            </div>

             <div class="tip tip2">
                <p @click="showTips2" class="tip-title" >常见问题 <img :class="{'active':showtip2}" src="../../assets/image/eImg/arrow.png" alt="arrow"/></p>
                 <transition name="expend-fade">
                        <div v-if="showtip2" class="item_warp ques">
                              <p class="ques_q"> <img src="../../assets/image/eImg/question.png" alt=""> 什么是等待期？有多少天？</p>                          
                              <p class="ques_a">
                                  A：自本合同生效之日起 30 日(含)内为等待期。在等待期内，被保险人因疾病接受治疗的，无论是否延续至可选责任等待期后，我们均不承担本合同的可选责任。续保合同无等待期。被保险人因意外伤害治疗的，无等待期。
                              </p>

                              <p class="ques_q"> <img src="../../assets/image/eImg/question.png" alt=""> 保障期限是多久？什么时候生效？</p>                          
                              <p class="ques_a">
                                  A：本产品的保险期间为 1 年，自合同生效日零时起计算。本产品自投保后的次日零时生效。
                              </p>

                              <p class="ques_q"> <img src="../../assets/image/eImg/question.png" alt="">本产品保证可以续保吗？</p>                          
                              <p class="ques_a">
                                  A：不保证。在每一保险期间届满前，您可以续保本合同，经我们审核同意并按续保时对应的费率收取保险费后本合同将延续有效。如果本保险产品停售，本合同不再接受续保。被保险人年满 81 周岁后不能再续保。
                              </p>

                              <p class="ques_q"> <img src="../../assets/image/eImg/question.png" alt="">曾经理赔过还可以续保么？</p>                          
                              <p class="ques_a">
                                  A：可以。根据《健康保险管理办法》第三条和第七条规定，短期健康险需不含保证续保条款。该产品只要没有未如实告知，续保时不因被保险人个人身体状况或发生理赔而不续保或单独调整费用。
                              </p>

                              <p class="ques_q"> <img src="../../assets/image/eImg/question.png" alt="">投保前已经生的病可以报销么？</p>                          
                              <p class="ques_a" style="border:none">
                                  A：不可以。为了使大家可以用最优的保费获得最高的保障，在发生疾病时真正获得高额医疗费用报销，本险种不接受带病投保的行为。投保前已患有的疾病以及症状，均不属于保障范围。
                              </p>
                              <p class="ques_q"> <img src="../../assets/image/eImg/question.png" alt="">电子保单是否具有合法的法律效力？</p>                          
                               <p class="ques_a" style="border:none">
                                  A：根据《中华人民共和国合同法》第十一条规定，数据电文是合法的合同表现形式，电子保单与纸质保单具有同等的法律效力。
                               </p>
                                
                        </div>
                 </transition>
            </div>
            <P class="bottomtips">*本产品资料为理解条款所用，仅供客户参考，各项保险利益以条款内容为准。</P>
        </div>
        </div>
        

        <footer>
            <div class="footer">
                <div class="footer-left-content" @click="televent">
                <a style="display:inline-block; width: 100%;text-decoration: none;"  href="tel:95596">
                    <img src="../../assets/image/eImg/phone.png" alt="">
                    <div class="kefu">
                       <span style="color:#fff">客服</span>
                    </div>
                 </a>
                </div>
                <div class="footer-right-btn"  @click="goselectprotection()">选择我的保障 <img src="../../assets/image/eImg/arrow.png" alt="arrow"/></div>
            </div>
        </footer>
     
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>











