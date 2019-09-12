import Vue from 'vue'
import App from './App'
import router from './router'
import './lib/css/transition.css'
import './lib/css/common.css'
import initPlugin from './initPlugin/index.js'
import rem from 'amfe-flexible'
import store from './vuex/index.js'
import config from '@/config.js'
import { DatetimePicker } from "mint-ui";
Vue.component(DatetimePicker.name, DatetimePicker);
import { Picker } from 'mint-ui';
Vue.component(Picker.name, Picker);
import 'mint-ui/lib/style.css'

window.Vue = Vue;
window.v = Vue.prototype;
Vue.prototype.$store = store
initPlugin();

Vue.config.productionTip = false;
Vue.prototype.$showLoading = function (desc) {
    desc = desc || '';
    setTimeout(() => {
        app.page.$root.$children[0].loading = true;
        app.page.$root.$children[0].loadingDesc = desc;
    })
}

Vue.prototype.$hideLoading = function () {
    setTimeout(() => {
        app.page.$root.$children[0].loading = false;
    })
}

v.$wxsdk.apiTicket('/hc/v0/shares/sign');

var openid = v.$url.parseUrl('token'); 
// var openid = v.$url.parseUrl('oid');  // 临时

v.$http.setCommonHeaders({
	accesskey: '15EOvS2ePZ',
    signature: 'test',
    token: openid
});

v.$http.setDomain(config.apiDomain);
v.$lonix.setDomain(config.apiDomain);
// v.$wxsdk.setDefaultShare(config.defaultShareOption);

v.$wxsdk.onShareSuccess = function () {
    var version = store.state.version
};

v.$wxsdk.onReady(() => { });

v.$url.getQueryStrDecode('oid', function (openId) {
    v.$localStorage.setItem('openId', openId);
    localStorage.setItem('openid', openId);
    v.$sessionStorage.setItem('openId', openId);
    sessionStorage.setItem('openid', openId);
    let source_ = v.$url.parseUrl('source')//==null?"":v.$url.parseUrl('source')
    try
    {
     if(source_.indexOf('share')>-1){
       let sourceNum = source_.split("share").length>1 ?  source_.split("share")[1]:'0'
       source_ ='share' + (+sourceNum+1)
     }else{
      source_ = 'share1'
     }
    }
  catch(err)
    {
      source_='share1'
    }
  config.defaultShareOption.link=`${location.origin}${location.pathname}?source=${source_}&agentId=${localStorage.AGENTID}`
  v.$wxsdk.setDefaultShare(config.defaultShareOption);

    new Vue({
        el: '#app',
        data: {},
        router,
        store,
        template: '<App/>',
        components: { App }
    });
});

// 百度统计的pv，uv
Vue.mixin({
    beforeRouteEnter(to, from, next) {
        if(!!to.meta.hmtName){
            v.$trackPageview(to.meta.hmtName)
        }
        next();
    }
});


// 解决安卓因调整字体大小导致的布局问题
(function () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }

    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
        });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', {
                'fontSize': 0
            });
        });
    }
})();