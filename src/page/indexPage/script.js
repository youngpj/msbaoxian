export default {
    name: 'Index',
    isPage: true,  // 必填项
    title:'老司机随e保',
    Data: {
        showtip1:false,
        showtip2:false,
        // payment:true
    },
    willEnterPage: function (data) {
      
    },
    mounted() {
      
    },
    didEnterPage(data) {
        // this.$switchTo("/inform"); 
    },
    methods: {
        goselectprotection(){
            this.$trackEvent('landingpage','next')
            this.$switchTo("/selectpage")
        },
        // 理赔说明
      showTips1(){
        this.$trackEvent('landingpage','claim')
          this.showtip1=!this.showtip1
      },
    //   常见问题
      showTips2(){
        this.$trackEvent('landingpage','faq')
          this.showtip2=!this.showtip2
        //   console.log(123)
        //   this.$switchTo("/select")
      },
    //   客服
      televent(){
        this.$trackEvent('landingpage','cs')
      }
     
    },
}