import config from '@/config.js'
// import selectGroup from '@/components/select-group.vue';
import switchGroup from '@/components/switch-group.vue';
import birtydaySelector from '@/components/birtyday-selector.vue';
import tipBox from '@/components/tipBox.vue';
import moment from "moment";
export default {
    name: 'SelectPage',
    isPage: true, // 必填项
    // shareVisiable:false,
    // shareOption: {

    // },
    title: '老司机随e保',
    Data: {
        insureItemShow: false,
        labelarr: {
            shebao: ["有", "无"],
            ewai: ["已选择", "未选择"],
        },
        tabInfo: {
            // 当前tab
            selectedTab: 'diy',
            // tab选项
            tabOption: {
                diy: {
                    Amount: '',
                    deductible: '',
                    scale: '',
                    minPrice: 63,
                },
                // 经适
                jingshi: {
                    Amount: '6',
                    deductible: '0',
                    scale: '50',
                    minPrice: 87,
                },
                // 性价比
                xingjiabi: {
                    Amount: '30',
                    deductible: '5',
                    scale: '100',
                    minPrice: 147,
                },
                // 百万医疗
                baiwan: {
                    Amount: '100',
                    deductible: '8',
                    scale: '100',
                    minPrice: 128,
                },
                // 防癌
                fangai: {
                    Amount: '100',
                    deductible: '10',
                    scale: '100',
                    minPrice: 110,
                },
            },
            // // 当前选项（默认为经适型）
            selected: {
                Amount: '',
                deductible: '',
                scale: '',
                minPrice: 63,
                Amount_disable: [],
                deductible_disable: [],
                scale_disable: [],
            },
        },
        // tips展示
        Amount_show: false,
        scale_show: false,
        deductible_show: false,

        extraProtection: false, //要住院医疗保额 50 万及以上才能选择
        // 被保人信息
        // defaultBirthDate:'1985-01-01',//日历插件默认显示的值
        userCheckInfo: {
            birthDate: new Date("1985/01/01"), // 被保人出生日期
            // relation: "", // 与被保人关系
            hasShebao: true // 有无社保
        },
        moneyChange: false,
        totalPayment: 63, // 当前选项（默认为经适型）
        couldgopage: false, //是否计算完成价格可以跳转到下一个地址
        storeInfos: '',
    },
    willEnterPage: function(data) {},
    didEnterPage(data) {
        this.calcRules()

    },
    watch: {
        'userCheckInfo.hasShebao': function(value) {
            this.$trackEvent("home", "social")
        },
        'userCheckInfo.birthDate': function(value) {
            this.$trackEvent("home", "birthday")
        },

    },
    methods: {
        // 点击_保障金额 tips
        amountShow() {
            this.$trackEvent('home', 'sumTips')
            this.Amount_show = true
        },

        // 点击_年免赔额 tips
        scaleShow() {
            this.$trackEvent('home', 'ratioTips')
            this.scale_show = true
        },
        // 点击_保障金额 tips
        deductibleShow() {
            this.$trackEvent('home', 'deductibleTips')
            this.deductible_show = true
        },

        //  客服
        televent() {
            this.$trackEvent('home', 'cs2')
        },
        /**
         * 展示保障项
         */
        shouwInsureItem() {
            this.$trackEvent("home", "items")
            this.insureItemShow = true
        },
        /**
         * tab选项选择
         */
        selectTab(value, tabchange = true) {

            if (value != 'diy' && value == this.tabInfo.selectedTab) {
                return
            }
            switch (value) {
                case 'diy':
                    this.$trackEvent('home', 'diy')
                    break;
                case 'jingshi':
                    this.$trackEvent('home', 'eco')
                    break;
                case 'xingjiabi':
                    this.$trackEvent('home', 'cost')
                    break;
                case 'baiwan':
                    this.$trackEvent('home', 'million')
                    break;
                case 'fangai':
                    this.$trackEvent('home', 'cancer')
                    break;
            }
            this.tabInfo.selectedTab = value
            if (value != 'diy' || (value == 'diy' && tabchange)) { //如果不是diy的tab ,或者是diy的tab且是收到点击tab进入的
                Object.assign(this.tabInfo.selected, this.tabInfo.tabOption[value])
                if (this.extraProtection && 'diy,jingshi,xingjiabi'.indexOf(value) > -1) {
                    this.extraProtection = false
                    this.$message.toast('您选择的额外保障已取消')
                }
            }
            // 如果是为diy 
            if (value == 'diy') {
                this.tabInfo.selected.minPrice = this.tabInfo.tabOption.diy.minPrice
            }
            if (this.tabInfo.selectedTab == 'fangai') { //如果是防癌的选项，默认选择额外保
                this.extraProtection = true
            }
            if (this.tabInfo.selectedTab == 'baiwan') { //如果是防癌的选项，默认选择额外保
                this.extraProtection = false
            }

            this.calcRules()
            this.getTotalPayment()
        },
        /**
         * 选择保障金额
         */
        selectAmount(value) {

            this.$trackEvent('home', 'sum')
                // 选择的不是原来的，且不是灰色值
            if (this.tabInfo.selected.Amount != value && this.tabInfo.selected.Amount_disable.indexOf(+value) == -1) {
                if (this.extraProtection && this.tabInfo.selected.Amount >= 50 && value < 50) {
                    this.extraProtection = false
                    this.$message.toast('您选择的额外保障已取消')
                }
                this.tabInfo.selected.Amount = value
                this.selectTab('diy', false)
            } else if (this.tabInfo.selected.Amount === value) { //选择的是原来的
                this.tabInfo.selected.Amount = ''
                this.selectTab('diy', false)
            }


        },
        /**
         * 选择年免赔额
         */
        selectDeductible(value) {
            this.$trackEvent('home', 'deductible')
                // 选择的不是原来的，且不是灰色值
            if (this.tabInfo.selected.deductible != value && this.tabInfo.selected.deductible_disable.indexOf(+value) == -1) {
                this.tabInfo.selected.deductible = value
                this.selectTab('diy', false)
            } else if (this.tabInfo.selected.deductible === value) { //选择的是原来的
                this.tabInfo.selected.deductible = ''
                this.selectTab('diy', false)
            }
        },
        /**
         * 选择赔付比例
         */
        selectScale(value) {
            this.$trackEvent('home', 'ratio')
                // 选择的不是原来的，且不是灰色值
            if (this.tabInfo.selected.scale != value && this.tabInfo.selected.scale_disable.indexOf(+value) == -1) {
                this.tabInfo.selected.scale = value
                this.selectTab('diy', false)
            } else if (this.tabInfo.selected.scale === value) { //选择的是原来的
                this.tabInfo.selected.scale = ''
                this.selectTab('diy', false)
            }
        },
        // 计算规则
        calcRules() {
            this.tabInfo.selected.deductible_disable = []
            this.tabInfo.selected.scale_disable = []
            this.tabInfo.selected.Amount_disable = []
                // 根据保额计算
            switch (this.tabInfo.selected.Amount) {
                case '6':
                    this.tabInfo.selected.deductible_disable.push(10) //不能 免赔额10千
                    this.tabInfo.selected.scale_disable.push(95) //不能 赔付比例95%
                    if (this.tabInfo.selected.scale == '50') {
                        this.tabInfo.selected.deductible_disable.push(2, 5, 8)
                    }
                    break;
                case '12':
                    this.tabInfo.selected.deductible_disable.push(10) //不能 免赔额10千
                    this.tabInfo.selected.scale_disable.push(50, 95) //不能 赔付比例95% 50%
                    break;
                case '30':
                    this.tabInfo.selected.deductible_disable.push(2) //不能 免赔额2千
                    this.tabInfo.selected.scale_disable.push(50) //不能 赔付比例50%
                    break;
                case '50':
                case '100':
                    this.tabInfo.selected.deductible_disable.push(2, 0) //不能 免赔额2千 ，0千
                    this.tabInfo.selected.scale_disable.push(50, 95) //不能 赔付比例50% 95%
                    break;
            }
            // 根据免赔额计算
            switch (this.tabInfo.selected.deductible) {
                case '0':
                    this.tabInfo.selected.Amount_disable.push(50, 100) //不能 保50,100万
                    this.tabInfo.selected.scale_disable.push(100) //不能 赔付比例100%
                    switch (this.tabInfo.selected.scale) {
                        case '50':
                            this.tabInfo.selected.Amount_disable.push(12, 30, 50, 100)
                            break;
                        case '85':
                            this.tabInfo.selected.Amount_disable.push(6, 30, 50, 100)
                            break;
                        case '95':
                            this.tabInfo.selected.Amount_disable.push(6, 12, 50, 100)
                            break;
                    }
                    switch (this.tabInfo.selected.Amount) {
                        case '6':
                            this.tabInfo.selected.scale_disable.push(85, 95)
                            break;
                        case '12':
                            this.tabInfo.selected.scale_disable.push(50, 95)
                            break;
                        case '30':
                            this.tabInfo.selected.scale_disable.push(50, 85)
                            break;
                    }
                    break;
                case '2':
                    this.tabInfo.selected.Amount_disable.push(30, 50, 100) //不能 保30,50,100万
                    this.tabInfo.selected.scale_disable.push(50, 95) //不能 赔付比例95% 50%
                case '5':
                case '8':
                    // this.tabInfo.selected.Amount_disable.push(30,50,100)//不能 保30,50,100万
                    this.tabInfo.selected.scale_disable.push(50, 95) //不能 赔付比例95% 50%
                    break;
                case '10':
                    this.tabInfo.selected.Amount_disable.push(6, 12) //不能 保6万 ，12万
                    this.tabInfo.selected.scale_disable.push(50, 95) //不能 赔付比例50% 95%
                    break;
            }
            // 根据赔付比例计算
            switch (this.tabInfo.selected.scale) {
                case '50':
                    this.tabInfo.selected.Amount_disable.push(12, 30, 50, 100) //不能 保12,30,50,100万
                    this.tabInfo.selected.deductible_disable.push(2, 5, 8, 10) //不能  免赔额2,5,8,10万
                    break;
                case '85':
                    break;
                case '95':
                    this.tabInfo.selected.Amount_disable.push(6, 12, 50, 100)
                    this.tabInfo.selected.deductible_disable.push(2, 5, 8, 10)
                    break;
                case '100':
                    // this.tabInfo.selected.Amount_disable.push(6,12)//不能 保6万 ，12万
                    this.tabInfo.selected.deductible_disable.push(0) //不能  免赔额0万
                    break;
            }
            console.log(this.tabInfo.selected)
        },
        /**
         * 跳转条款链接
         */
        toProvision() {
            this.$trackEvent('home', 'terms')
            if (this.tabInfo.selected.deductible === '0') {
                this.$switchTo('/provisionkeb')
            } else {
                this.$switchTo('/provisionseb')
            }
        },
        /**
         * 跳转投保须知
         */
        toXuzhi() {
            this.$trackEvent('home', 'notice')
            this.$switchTo('/xuzhi')
        },
        /**
         * 切换额外保险
         */
        changeExtraPro(value) {
            if (value && this.tabInfo.selected.Amount < 50) {
                this.$message.toast('需要住院医疗保额 50 万及以上才能选择')
                this.extraProtection = false
            }
            this.$trackEvent('home', 'add')
            this.getTotalPayment()
        },
        /**
         * 立即投保
         */
        toinsure() {

            if (!this.userCheckInfo.birthDate) {
                this.$message.toast("请选择被保人出生日期");
            } else if (this.tabInfo.selected.Amount === "" || this.tabInfo.selected.deductible === "" || this.tabInfo.selected.scale == "") {
                let options = (this.tabInfo.selected.Amount === "" ? "保障金额," : "") + (this.tabInfo.selected.deductible === "" ? "年免赔额," : "") + (this.tabInfo.selected.scale === "" ? "赔付比例" : "")
                this.$message.toast("请选择：" + options.split(',').filter(c => { return c }).join('、'));
            } else {
                // 避免未计算完成价格，点击立即投保导致没有保存选择的保单参数
                if (!this.couldgopage) {
                    this.$message.toast("未计算出价格")
                    return
                }

                v.$localStorage.setItem('storeInfos', this.storeInfos)
                let trackJosn = {
                        category: 0, // 菜单选择    diy定制0,经适版1，性价比2，百万医疗3，防癌4
                        amount: this.tabInfo.selected.Amount, //保障金额（6,12....）
                        deductable: this.tabInfo.selected.deductible * 1000, // 免赔额
                        percent: this.tabInfo.selected.scale + "%", // 赔付比率
                        tumour: this.extraProtection ? 1 : 0, //肿瘤（0,1）
                        socialsecurity: this.userCheckInfo.hasShebao ? 1 : 0, //是否有社保（0,1）
                        bornyear: `${this.userCheckInfo.birthDate.getFullYear()}-${this.userCheckInfo.birthDate.getMonth() + 1}-${this.userCheckInfo.birthDate.getDate()}` + "T00:00:00.000+0800", //出生日期
                        premium: this.totalPayment, //保费
                    }
                    // 菜单选择埋点
                switch (this.tabInfo.selectedTab) {
                    case "diy":
                        trackJosn.category = 0
                        break;
                    case "jingshi":
                        trackJosn.category = 1
                        break;
                    case "xingjiabi":
                        trackJosn.category = 2
                        break;
                    case "baiwan":
                        trackJosn.category = 3
                        break;
                    case "fangai":
                        trackJosn.category = 4
                        break;
                }
                v.$localStorage.setItem('selectedTab', this.tabInfo.selectedTab)
                this.$trackEvent('home', 'insure', trackJosn);
                setTimeout(() => {
                    this.$switchTo("/inform");
                }, 200);
                // this.$message.confirm(
                //     "",
                //     "投保本产品是否是您本人意愿？",
                //     (res) => {
                //         if (res) {

                //             setTimeout(() => {
                //                 // v.$acMonitor.sendInput('_是，确认投保 ');
                //                 this.$switchTo("/inform");
                //             }, 100)
                //             // v.$hmt.trackEvent(this.version, 'click', 'home_yes')
                //                 // _hmt.push(["_trackEvent", "button", "message", "home_kebjs_yes"]);
                //         } else {
                //             // this.stopScroll(false);
                //             // v.$acMonitor.sendInput('不投保');
                //             // v.$hmt.trackEvent(this.version, 'click', 'home_no')
                //                 // _hmt.push(["_trackEvent", "button", "click", "home_kebjs_no"]);
                //         }
                //     },
                //     "是，确定投保",
                //     "不投保"
                // )
            }
        },
        /**
         * 计算保费
         */
        getTotalPayment: function() {

            var _this = this;
            var timer = null;
            var get = function() {
                // 默认先显示最低值
                if (!this.userCheckInfo.birthDate) {
                    this.totalPayment = this.tabInfo.selected.minPrice
                    this.moneyChange = false;
                    return
                }
                if (this.tabInfo.selected.Amount === "" || this.tabInfo.selected.deductible === "" || this.tabInfo.selected.scale == "") {
                    this.totalPayment = this.tabInfo.selected.minPrice
                    this.moneyChange = false;
                    return
                }
                this.$showLoading();
                //免赔额为 0 时走老接口康E宝查询
                if (this.tabInfo.selected.deductible == 0) {
                    this.old_getPayment()
                } else {
                    this.new_getPayment()
                }
            }
            return function() {
                this.couldgopage = false
                if (timer) { clearTimeout(timer) };
                timer = setTimeout(() => {
                    get.apply(this);
                }, 200);
            }
        }(),
        /**
         * 0免赔---走老接口获取保费信息
         */
        old_getPayment() {
            let planObj = {
                "6": 1,
                "12": 2,
                "30": 3,
            }
            this.storeInfos = {
                "TYPE": 'old', //作为判断是否是老康e宝
                'MPN': planObj[this.tabInfo.selected.Amount], //this.hospitalChoose,//康医保保障金额对应的套餐 -- 
                'OPN': 0,
                'SOCIALSECURITY': this.userCheckInfo.hasShebao ? 1 : 0,
                'birthday': `${this.userCheckInfo.birthDate.getFullYear()}-${this.userCheckInfo.birthDate.getMonth() + 1}-${this.userCheckInfo.birthDate.getDate()}` + "T00:00:00.000+0800"
            };
            this.$http.post(config.test_yingshe + '/api/facade/policy/pricing', {
                "insureparameters": {
                    "BIRTHDAY": moment(this.userCheckInfo.birthDate).format('YYYY-MM-DD'),
                    "MPN": planObj[this.tabInfo.selected.Amount], //this.hospitalChoose,//康医保保障金额对应的套餐 -- 
                    "OPN": 0,
                    "RELATIONWITHHOLDER": "SELF",
                    "SOCIALSECURITY": this.userCheckInfo.hasShebao ? 1 : 0
                },
                "productCode": config.productCode_keb
            }).then(res => {

                if (res.data.code === '0000') {
                    this.totalPayment = res.data.attachment.ProductInfo.app;
                    this.moneyChange = true;
                    // this.$localStorage.setItem('storeInfos', {
                    //   "TYPE":'old',//作为判断是否是老康e宝
                    //   'MPN': planObj[this.tabInfo.selected.Amount], //this.hospitalChoose,//康医保保障金额对应的套餐 -- 
                    //   'OPN': 0,
                    //   'SOCIALSECURITY': this.userCheckInfo.hasShebao ? 1 : 0,
                    //   'birthday': `${this.userCheckInfo.birthDate.getFullYear()}-${this.userCheckInfo.birthDate.getMonth() + 1}-${this.userCheckInfo.birthDate.getDate()}` + "T00:00:00.000+0800"
                    // });
                    // this.actionMonitor();
                    this.$hideLoading();
                    this.couldgopage = true
                }
            }).catch(err => {
                this.$hideLoading();
                // this.couldgopage=true
                this.totalPayment = '--';
                console.log(err);
                this.$message.warning('服务器异常了');
                // this.totalPayment = 10;
                // this.moneyChange = false;
            });
        },
        /**
         * 非0免赔 走新接口
         */
        new_getPayment() {

            this.storeInfos = {
                "TYPE": 'new', //作为判断是否是新随e宝
                "SOCIALSECURITY": this.userCheckInfo.hasShebao ? 1 : 0,
                "OPTION_COVERAGE": this.extraProtection ? 1 : 0, //额外保障
                "BIRTHDAY": moment(this.userCheckInfo.birthDate).format('YYYY-MM-DD'),
                "DEDUCTIBLE": this.tabInfo.selected.deductible * 1000, //免赔
                "CLAIMRATIO": this.tabInfo.selected.scale * 0.01, //比例
                "MAXCLAIMAMOUNT": this.tabInfo.selected.Amount * 10000, //保额
            };

            let params = {
                // "channelCode": "string",
                // "channelUserId": "string",
                "informparameter": {
                    "INFORM_RESULT": "是",
                },
                "insureparameters": {
                    "SOCIALSECURITY": this.userCheckInfo.hasShebao ? 1 : 0, //社保
                    "OPTION_COVERAGE": this.extraProtection ? 1 : 0, //额外保障
                    "BIRTHDAY": moment(this.userCheckInfo.birthDate).format('YYYY-MM-DD'),
                    "DEDUCTIBLE": this.tabInfo.selected.deductible * 1000, //免赔
                    "CLAIMRATIO": this.tabInfo.selected.scale * 0.01, //比例
                    "MAXCLAIMAMOUNT": this.tabInfo.selected.Amount * 10000, //保额
                },
                "productCode": config.productCode
            }
            this.$http
                .post(config.test_yingshe + "/api/facade/policy/pricing", params).then(res => {
                    if (res.data.attachment) {
                        this.totalPayment = res.data.attachment.ProductInfo.app;
                        this.moneyChange = true;
                        // this.$localStorage.setItem('storeInfos', {
                        //   "TYPE":'new',//作为判断是否是新随e宝
                        //   "SOCIALSECURITY":this.userCheckInfo.hasShebao  ? 1 : 0,
                        //   "OPTION_COVERAGE": this.extraProtection ? 1 : 0,//额外保障
                        //   "BIRTHDAY": moment(this.userCheckInfo.birthDate).format('YYYY-MM-DD'),
                        //   "DEDUCTIBLE":this.tabInfo.selected.deductible*1000,//免赔
                        //   "CLAIMRATIO":this.tabInfo.selected.scale*0.01,//比例
                        //   "MAXCLAIMAMOUNT":this.tabInfo.selected.Amount*10000, //保额
                        // });
                        // this.actionMonitor();
                        this.$hideLoading();
                        this.couldgopage = true
                    }
                }).catch(err => {
                    this.$hideLoading();
                    this.$message.warning("服务器异常了");
                    this.totalPayment = '--';
                    this.moneyChange = false;
                })
        },
    },

    components: {
        switchGroup,
        birtydaySelector,
        tipBox,
        // rangeGroup
    },
}