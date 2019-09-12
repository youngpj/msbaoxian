import gaozhiUrl from '../../assets/doc/jiankanggaozhi.pdf';
import jubaoUrl from '../../assets/doc/jubaozhiye.pdf';

export default {
    name: 'Index',
    title:"健康告知",
    isPage: true,  // 必填项
    // shareVisiable:false,
    Data: {
        gaozhiUrl: gaozhiUrl,
        jubaoUrl: jubaoUrl
    },
    willEnterPage: function(data) {
        console.log(data);
        // console.log('will');
    },
    didEnterPage(data) {
        // console.log('did')
    },
    methods: {
        gaozhi() {
                        
        },
        reject() {
            this.$trackEvent('health','allno')
            this.$message.toast('抱歉，被保险人没有通过投保健康测试，暂时无法投保！');
            setTimeout(() => {
                this.$goBackward();
            }, 2000);
        },
        toInsure(){
            this.$showLoading();
            this.$trackEvent('health','yes')
            this.$switchTo('/insure');
        }
    }
}