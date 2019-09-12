import gaozhiUrl from '../../assets/doc/jiankanggaozhi.pdf';
import rejectGroup from "@/components/reject-profession-group.vue";
import jubaoData from '../../assets/doc/jubaozhiye.json';

export default {
    name: 'Index',
    isPage: true, // 必填项
    Data: {
        gaozhiUrl: gaozhiUrl,
        jubaoData: jubaoData,
        qipaoVisible: false
    },
    willEnterPage: function(data) {},
    didEnterPage(data) {},
    methods: {
        reject() {
            this.$trackEvent('health', 'allno')

            this.$message.toast('抱歉，被保险人没有通过投保健康测试，暂时无法投保！');
            setTimeout(() => {
                this.$goBackward();
            }, 2000);
        },
        toInsure() {
            this.$trackEvent('health', 'yes')

            this.$showLoading();
            this.$switchTo('/insure');
        },
        more(evt) {
            this.qipaoVisible = true;
            evt.preventDefault();
            evt.stopPropagation();
        },
        closeMore() {
            this.qipaoVisible = false;
        }
    },
    computed: {},
    components: {
        rejectGroup
    }
}