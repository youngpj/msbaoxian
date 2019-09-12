<template>
  <div class="page">
      <div class="notice" input-tag="提示">
             <img src="../../assets/image/eImg/warring1.png" class="laba"/>
          请确认您填写的信息正确，以免对您的保障权益造成影响。
      </div>
    <!-- 投保人信息 -->
    <div class="info-container">
      <!-- <div class="info-title">投保人信息</div> -->
      <div class="info-item-content">
        <div class="info-item">
          <div class="key">投保人</div>
          <div class="val" input-tag="投保人-姓名">{{ policyInfo && policyInfo.holderCustomer.customerName }}</div>
        </div>
        <div class="info-item">
          <div class="key">身份证</div>
          <div class="val" input-tag="投保人-证件编号">{{ policyInfo && policyInfo.holderCustomer.idNumber }}</div>
        </div>
        <div class="info-item">
          <div class="key">职业类别</div>
          <div class="val">{{ policyInfo && policyInfo.holderCustomer.parameters.JOB }}</div>
        </div>
        <div class="info-item"> 
          <div class="key">手机号码</div>
          <div class="val" input-tag="投保人-手机号码">{{ policyInfo && policyInfo.holderCustomer.mobile }}</div>
        </div>
        <div class="info-item"> 
          <div class="key">被保人</div>
          <div class="val" input-tag="被保险人-姓名">{{ policyInfo && policyInfo.beInsuredCustomers[0].customerName }}</div>
        </div>
        <div class="info-item"> 
          <div class="key">与投保人关系</div>
           <div class="val" input-tag="被保险人-与投保人关系">{{ policyInfo && relationOpt[policyInfo.beInsuredCustomers[0].relationWithHolder] }}</div>
        </div>
        <div class="info-item" v-if="policyInfo && policyInfo.beInsuredCustomers[0].idNumber!= policyInfo.holderCustomer.idNumber" > 
          <div class="key"  >身份证</div>
          <div class="val" input-tag="被保险人-证件编号">{{ policyInfo && policyInfo.beInsuredCustomers[0].idNumber }}</div>
        </div>
        <div class="info-item">
          <div class="key">职业类别</div>
          <div class="val">{{ policyInfo && policyInfo.beInsuredCustomers[0].parameters.JOB }}</div>
        </div>
        <div class="info-item"> 
          <div class="key">有无社保</div>
           <div class="val" input-tag="保险信息-有无社保">{{ policyInfo && policyInfo.beInsuredCustomers[0].parameters.SOCIALSECURITY == '1' ? '有' : '无'}}</div>
           <!-- <div class="val" input-tag="保险信息-有无社保">{{ policyInfo && policyInfo.policyExpandInfo.SOCIALSECURITY == 1 ? '有' : '无'}}</div> -->
        </div>
      </div>
    </div>

    <!-- 被保人信息 -->
    <!-- <div class="info-container">
      <div class="info-title">被保险人信息</div>
      <div class="info-item-content">
        <div class="info-item">
          <div class="key">与投保人关系</div>
          <div class="val" input-tag="被保险人-与投保人关系">{{ policyInfo && relationOpt[policyInfo.insureds[0].relationWithPH] }}</div>
        </div>
        <div class="info-item">
          <div class="key">性别</div>
          <div class="val" input-tag="被保险人-性别">{{ policyInfo && policyInfo.insureds[0].gender == 'M' ? '男' : '女' }}</div>
        </div>
        <div class="info-item">
          <div class="key">姓名</div>
          <div class="val" input-tag="被保险人-姓名">{{ policyInfo && policyInfo.insureds[0].name }}</div>
        </div>
        <div class="info-item">
          <div class="key">证件类型</div>
          <div class="val" input-tag="被保险人-证件类型">身份证</div>
        </div>
        <div class="info-item">
          <div class="key">证件编号</div>
          <div class="val" input-tag="被保险人-证件编号">{{ policyInfo && policyInfo.insureds[0].idNumber }}</div>
        </div>
        <div class="info-item"> 
          <div class="key">出生日期</div>
          <div class="val" input-tag="被保险人-出生日期">{{ policyInfo && policyInfo.insureds[0].birthday.substr(0,10) }}</div>
        </div>
      </div>
    </div> -->

    <!-- 投保信息 -->
    <div class="info-container">
      <div class="info-title">投保信息</div>
      <div class="info-item-content">
        <div class="info-item">
          <div class="key">保障期限</div>
          <div class="val" input-tag="保险信息-保障期限">{{policyInfo && policyInfo.effectiveDate}}至{{policyInfo && policyInfo.expiredDate}}</div>
        </div>
        <div class="info-item">
          <div class="key">受益人</div>
          <div class="val" input-tag="保险信息-受益人">{{ policyInfo && policyInfo.beInsuredCustomers[0].customerName }}</div>
        </div>
      <table  border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th>保障额度 </th>
          <th>免赔额 </th>
          <th>赔付比例</th>
          <th>保额</th>
        </tr>
        <template v-if="storeInfo.TYPE=='new'">
          <tr>
            <td>一般医疗保险金</td>
            <td>{{storeInfo.DEDUCTIBLE | thousandshow}}</td>
            <td>{{storeInfo.CLAIMRATIO*100}}%</td>
            <td>{{storeInfo.MAXCLAIMAMOUNT/10000}}万</td>  
          </tr>
          <tr v-if="storeInfo.OPTION_COVERAGE=='1'">
            <td>恶性肿瘤医疗保险金</td>
            <td>0</td>
            <td>{{storeInfo.CLAIMRATIO*100}}%</td>
             <td>{{storeInfo.MAXCLAIMAMOUNT/10000}}万</td>  
          </tr>
        </template>
<template v-else>
          <tr>
            <td>一般医疗保险金</td>
            <!-- <td>{{storeInfo.OPN}}</td> -->
            <td>{{storeInfo.OPN}}</td>
            <td>{{mpnValue[storeInfo.MPN][1]}}</td>
            <td>{{mpnValue[storeInfo.MPN][0]}}</td>  
          </tr>
        </template>
</table>
</div>
</div>

<!-- 保障额度 -->
<!-- <div class="info-container">
      <div class="info-title">保障额度</div>
      <div class="info-item-content" v-if="policyInfo">
        <div class="info-item"  v-for="(item, index) in policyInfo.policyCoverages" :key="index" v-show="item.amount">
          <div class="key">{{ item.coverageName }}</div>
          <div class="val" :input-tag="'保险信息-' + item.coverageName">{{item.amount}}元</div>
        </div>
      </div>
    </div> -->



<div class="pay-container">
    <div class="pay-key">实付保费：</div>
    <div class="pay-val" input-tag="实付保费"><span style="font-size: 0.39436619718309857rem;">￥</span>{{app}}</div>
</div>
<div class="footer-btn" @click="confirmOrder" click-tag="确认支付">确认支付 ¥ {{app}}</div>

</div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>