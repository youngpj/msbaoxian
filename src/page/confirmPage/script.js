import config from '@/config.js'
import moment from 'moment';

export default {
    name: 'Confirm',
    isPage: true,
    title: "投保确认",
    Data: {
        name: 'logan',
        age: '12',
        proposalNumber: '',
        policyInfo: null,
        relationOpt: {
            'SELF': '本人',
            'PARENTS': '父母',
            'SPOUSE': '配偶',
            'CHILD': '子女'
        },
        aopamounts: {
            'must': '', // 一般医疗
            'option': '', // 普通门急诊
            'diff': '' // 恶性肿瘤
        },
        totalPayment: 0,
        openId: null,
        app: null,
        mpnValue: {
            1: ["6万", '50%'],
            2: ["12万", '85%'],
            3: ["30万", '95%']
        },
    },
    filters:{
        thousandshow : function(value){
             let str = value.toString()
            if(/\./.test(str)){
                return str.replace(/\d(?=(\d{3})+\.)/g, "$&,").replace(/\d{3}(?![,.]|$)/g, "$&,");
              }else{
                return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
              }
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {})
    },
    willEnterPage: function(data) {
        this.policyInfo = this.$localStorage.getItem('orderinfo'); //下单接口的
        this.storeInfo = this.$localStorage.getItem('storeInfos'); //试算接口的
        this.storeInfo.birthday = this.getBirthdayFromIdCard(this.policyInfo.beInsuredCustomers[0].idNumber)
        this.policyInfo.effectiveDate = this.getEffectiveDate();
        this.policyInfo.expiredDate = this.getExpiredDate('1-Y');
        this.pricing();
        console.log(this.policyinfo)
        this.$showLoading();
        this.$url.getQueryStrDecode('oid', (openId) => {
            this.openId = openId;
            this.$hideLoading();
        });
    },
    didEnterPage: function(data) {},
    methods: {
        // getPolicyInfos() {

        //     if (this.proposalNumber) {
        //         this.$showLoading();
        //         v.$http.get(`${config.test_yingshe}/api/facade/query/order/proposal/${this.proposalNumber}`).then( res => {

        //             if (res.data.code == '0000') {

        //                 this.policyInfo = res.data.attachment;

        //                 if (this.policyInfo && this.policyInfo.policyCoverages) {
        //                     this.policyInfo.policyCoverages.forEach(coverage => {
        //                         coverage.policyClaimLimits.forEach(claim => {
        //                             if (claim.claimType == 'AOP') {
        //                                 coverage.amount = claim.maxClaimAmount >= 10000 ? claim.maxClaimAmount / 10000 + '万' : claim.maxClaimAmount;
        //                             }
        //                         });
        //                     });
        //                 }

        //             }

        //             this.$hideLoading();
        //         })
        //     } else {
        //         this.$replace('/');
        //     }
        // },
        pricing() {
            if (this.storeInfo.TYPE == 'old') {
                this.old_getPayment()
            } else {
                this.new_getPayment()
            }
        },
        old_getPayment() {
            this.$http.post(config.test_yingshe + '/api/facade/policy/pricing', {
                "insureparameters": {
                    "BIRTHDAY": moment(this.storeInfo.birthday).format('YYYY-MM-DD'),
                    "MPN": this.storeInfo.MPN, //this.hospitalChoose,//康医保保障金额对应的套餐 -- 
                    "OPN": 0,
                    "RELATIONWITHHOLDER": "SELF",
                    "SOCIALSECURITY": this.storeInfo.SOCIALSECURITY
                },
                "productCode": config.productCode_keb
            }).then(res => {

                if (res.data.code === '0000') {
                    this.app = res.data.attachment.ProductInfo.app;
                    this.$hideLoading();
                }
            }).catch(err => {
                this.$hideLoading();
                console.log(err);
                this.$message.warning('服务器异常了');
            });
        },
        /**
         * 非0免赔 走新接口
         */
        new_getPayment() {

            //   this.$localStorage.setItem('storeInfo', {
            //     "TYPE": 'new', //作为判断是否是新随e宝
            //     "SOCIALSECURITY": this.userCheckInfo.hasShebao ? 1 : 0,
            //     "OPTION_COVERAGE": this.extraProtection ? 1 : 0, //额外保障
            //     "BIRTHDAY": moment(this.userCheckInfo.birthday).format('YYYY-MM-DD'),
            //     "DEDUCTIBLE": this.tabInfo.selected.deductible * 1000, //免赔
            //     "CLAIMRATIO": this.tabInfo.selected.scale * 0.01, //比例
            //     "MAXCLAIMAMOUNT": this.tabInfo.selected.Amount * 10000, //保额
            //   });

            let params = {
                // "channelCode": "string",
                // "channelUserId": "string",
                "informparameter": {
                    "INFORM_RESULT": "是",
                },
                "insureparameters": {
                    "SOCIALSECURITY": this.storeInfo.SOCIALSECURITY, //社保
                    "OPTION_COVERAGE": this.storeInfo.OPTION_COVERAGE, //额外保障
                    "BIRTHDAY": moment(this.storeInfo.birthday).format('YYYY-MM-DD'),
                    "DEDUCTIBLE": this.storeInfo.DEDUCTIBLE, //免赔
                    "CLAIMRATIO": this.storeInfo.CLAIMRATIO, //比例
                    "MAXCLAIMAMOUNT": this.storeInfo.MAXCLAIMAMOUNT, //保额
                },
                "productCode": config.productCode
            }
            this.$http
                .post(config.test_yingshe + "/api/facade/policy/pricing", params).then(res => {
                    if (res.data.attachment) {
                        this.app = res.data.attachment.ProductInfo.app;
                    }
                }).catch(err => {
                    this.$hideLoading();
                    this.$message.warning("服务器异常了");
                })
        },
        async confirmOrder() {
            try {
                // if (this.storeInfo.TYPE == 'old') {
                //   await this.old_create()
                // } else {
                //   await this.new_create()
                // }
                await this.new_create()
                await this.payMoney().then((opt) => {
                    this.requestWechatPay(opt).then(() => {
                        this.$replace('/paysuccess');
                    })
                })
            } catch (err) {
                console.log(err)
            }
        },
        old_create() {
            let reqOpt = this.$localStorage.getItem('orderinfo');
            this.$showLoading();

            return new Promise((resolve, reject) => {
                this.$http.post(config.test_yingshe + '/api/facade/policy/proposal', reqOpt).then(res => {
                    this.$hideLoading();
                    open();
                    if (res.data.code == '0000') {
                        this.policyInfo.orderId = res.data.attachment.orderId
                        this.policyInfo.proposalNumber = res.data.attachment.proposalNumber;
                        resolve()
                    } else {
                        // _hmt.push(['_trackEvent', 'button', 'message', 'insure_kangebao_pop3']);
                        if (res.data.message == '每名被保险人只能购买一份该产品。') {
                            // if (this.version == 'index') {
                            //     // v.$hmt.trackEvent(this.version, 'message', 'insure_pop3')
                            // } else {
                            //     // v.$hmt.trackEvent(this.version, 'message', 'insure_popAmount')
                            // }
                            this.$message.alert('', '被保险人已有康e保产品订单\n无法再次购买', function() {
                                location.href = config.queryUrl;
                            }, '去查看');
                        } else {
                            if (this.version == 'index') {
                                // v.$hmt.trackEvent(this.version, 'message', 'insure_pop3')
                            } else {
                                // v.$hmt.trackEvent(this.version, 'message', 'insure_popAge2')
                            }
                            this.$message.alert('', res.data.message);
                        }
                        reject()
                    }
                });
            })
        },
        /**
         * 随意宝（非0免赔）创建保单
         */
        new_create() {
            let reqOpt = this.$localStorage.getItem('orderinfo');
            this.$showLoading();
            return new Promise((resolve, reject) => {
                this.$http.post(config.test_yingshe + '/api/facade/policy/proposal', reqOpt).then(res => {
                    this.$hideLoading();
                    open();
                    console.log('--------------')
                    console.log(res)
                    if (res.data.code == '0000') {
                        this.policyInfo.orderId = res.data.attachment.orderId
                        this.policyInfo.proposalNumber = res.data.attachment.proposalNumber;
                        resolve()
                    } else {
                        // _hmt.push(['_trackEvent', 'button', 'message', 'insure_kangebao_pop3']);
                        if (res.data.message == '每名被保险人只能购买一份该产品。') {
                            this.$trackEvent('insure', 'popAmount')
                            this.$message.alert('', '被保险人已有康e保产品订单\n无法再次购买', function() {
                                location.href = config.queryUrl;
                            }, '去查看');
                        } else {
                            this.$message.alert('', res.data.message);
                        }
                        // debugger;
                        reject()
                    }
                });
            })
        },

        payMoney() {
            // _hmt.push(['_trackEvent', 'button', 'click', 'confirm_kangebao_pay']);
            this.$trackEvent('confirm', 'pay')
            this.$showLoading();
            this.$http.post(config.test_yingshe + '/api/facade/policy/pay', {
                "orderId": this.policyInfo.orderId,
                "paymentType": "WECHAT"
            }).then(res => {
                if (res.data.code == '0000') {
                    var opt = res.data.attachment;
                    this.requestWechatPay(opt).then(() => {
                        this.$replace('/paysuccess');
                    }).catch(err => {
                        var query = `?redirect_path=detail&proposalNumber=${this.policyInfo.proposalNumber}&proType=1`
                        this.$http.post(`${config.test_yingshe}/api/facade/policy/failedNotice/${this.policyInfo.proposalNumber}`, {
                            url: config.queryUrl + encodeURIComponent(query)
                        });
                        console.log(err)
                        if (err == 'payfail') {
                            this.$replace('/payfail');
                        } else {
                            this.$message.toast(err);
                        }
                    });
                }else{
                    this.$message.toast(res.data.message);
                }
            })
        },
        requestWechatPay(opt) {
            return new Promise((resolve, reject) => {
                if (WeixinJSBridge) {
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": opt.appId, //公众号名称，由商户传入     
                            "timeStamp": opt.timeStamp, //时间戳，自1970年以来的秒数     
                            "nonceStr": opt.nonceStr, //随机串     
                            "package": opt.package,
                            "signType": "MD5", //微信签名方式：     
                            "paySign": opt.paySign //微信签名 
                        },
                        (res) => {
                            this.$hideLoading();
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                // 使用以上方式判断前端返回,微信团队郑重提示：
                                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                resolve();
                            } else {
                                reject('payfail');
                            }
                        });
                } else {
                    reject('请再微信端支付');
                }
            })

        },
        getEffectiveDate: function() {
            var tomorrow = moment(new Date(Date.now() + (1000 * 60 * 60 * 24))).format('YYYY-MM-DD');

            return tomorrow + ' 00:00:00';
        },
        getExpiredDate: function(dateNum) {
            if (!dateNum) return;
            var date = new Date();
            var interval = dateNum.charAt(dateNum.length - 1)
            var number = parseInt(dateNum)
            switch (interval) {
                case "Y":
                    {
                        date.setFullYear(date.getFullYear() + number);
                        return moment(date).format('YYYY-MM-DD') + " 23:59:59";
                        break;
                    }
                case "M":
                    {
                        date.setMonth(date.getMonth() + number);
                        return moment(date).format('YYYY-MM-DD') + " 23:59:59";
                        break;
                    }
                case "D":
                    {
                        date.setDate(date.getDate() + number);
                        return moment(date).format('YYYY-MM-DD') + " 23:59:59";
                        break;
                    }
                default:
                    {
                        date.setDate(date.getDate() + number);
                        return '';
                        break;
                    }
            }
        },
        getBirthdayFromIdCard: function(idCard) {
            var birthday = "";
            if (idCard != null && idCard != "") {
                if (idCard.length == 15) {
                    birthday = "19" + idCard.substr(6, 6);
                } else if (idCard.length == 18) {
                    birthday = idCard.substr(6, 8);
                }

                birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
            }
            return birthday;
        }
    }
}