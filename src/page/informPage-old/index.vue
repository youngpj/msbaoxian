<template>
    <div id="page" class="page">
        <!-- 公告 -->
        <div class="notice" input-tag="提示">
            <!-- <img src="../../assets/image/laba.png" class="laba"/> -->
             <img src="../../assets/image/laba2.png" class="laba"/>
          为了保证被保人的保险权益在理赔时不受影响，请如实完成健康告知。
        </div>
        <header>
            健康告知
        </header>
        <main input-tag="健康告知">
            <div class="container">
                <p class="info-item">
                    1、被保险人最近2年内是否因健康异常发生过住院或手术？被保险人在过去一年内健康检查时是否发现血液、超声、影像检查、内镜、病理检查等异常？
                </p>
                
                <p class="info-item">
                    2、被保险人是否有或被怀疑有下列健康异常：精神疾病、失聪、语言功能丧失、肢体缺损、疝、痔、结石、包块、肿物、息肉、恶性肿瘤、癌症、原位癌、白血病？
                </p>
                <p class="info-item">
                    3、循环及呼吸系统疾病：高血压、心脑血管疾病、主动脉疾病、心脏病、静脉曲张、外周动脉血管疾病；肺纤维化、支气管扩张、慢性支气管炎、肺气肿、哮喘、肺结核、咯血？
                </p>
                <p class="info-item">
                    4、内分泌及消化系统疾病：糖尿病、系统性红斑狼疮、甲状腺疾病、脑垂体疾病；肝炎、肝硬化、消化道溃疡、胰腺疾病、慢性萎缩性胃炎、消化道出血、肠息肉、便血？
                </p>
                <p class="info-item">
                   5、血液、免疫及泌尿系统疾病：类风湿性疾病、重症肌无力、痛风、强直性脊柱炎、紫癜症；尿毒症、肾病、血尿；
                </p>
                <p class="info-item">
                    6、肌肉、骨骼及神经系统疾病：癫痫、脊髓病变、帕金森病、慢性酒精中毒；
                </p>
                <p class="info-item">
                    7、五官疾病：白内障、青光眼、视网膜疾病；
                </p>
                <p class="info-item">
                    8、被保险人是否患有妊娠高血压、妊娠糖尿病？ （女性告知）
                </p>
                <p class="info-item">
                    9、2周岁以下被保险人出生时体重是否低于2.5公斤，是否存在早产、窒息、发育迟缓、脑瘫情况？
                </p>
                <p class="info-item">
                    （以下情形导致的住院仍可投保：:a.分娩;b.急性呼吸系统疾病;c.急性胃肠炎、急性阑尾炎;d.胆结石经治疗后2年内未复发;e.胆囊息肉已手术切除且病理结果为良性;f.意外住院在5天以内且已痊愈，并无后遗症或器官缺损。）
                </p>
                <p class="info-item">
                    （以下常见健康检查异常仍可投保:a. 甲状腺囊肿、甲状腺结节经穿刺活检证实为良性、甲状腺结节伴甲状腺功能检查正常并经核素扫描证实为功能性结节的;b. 轻度脂肪肝且肝功能结果正常;c. 收缩压90mmHg~160mmHg、舒张压60mmHg ~100mmHg;d. 鼻炎;咽炎;慢性浅表性胃炎;f.病毒性感冒引起的血常规检查异常）                </p>
            </div>
            <!-- <div class="more-container">
                更多详情，请阅读<a :href="gaozhiUrl" @click="gaozhi">《健康告知》</a>和<a :href="jubaoUrl" @click="trackEvent('health_isuixing_job')">《拒保职业类别表》</a>
            </div> -->
        </main>
        <footer>
            <div class="footer-btn" @click="reject()" click-tag="部分为是">
                <img src="../../assets/image/warning2.png" />
                部分为是
            </div>
            <div class="footer-btn" @click="toInsure" click-tag="以上全否">
                <img src="../../assets/image/bingo.png" />
                以上全否
            </div>
        </footer>
        
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
