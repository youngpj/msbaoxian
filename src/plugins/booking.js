/*
 * @Author: ypj 
 * @Date: 2019-01-21 13:32:31 
 * @Last Modified by: ypj
 * @Last Modified time: 2019-01-23 18:10:44
 *调用请 loadStoreInfos 下面,可以传入回调,不传入自动合并,   codeType可以传入config的 产品名称 为了老司机2个产品
 * 注意:最好传入的预约传入的数据和下单页面的data 数据格式相同
 */
import config from '@/config'
var booking = function(codeType,callback) {
        
var url = (/activity.minshenglife/.test(location.origin))?"http://www.msjk95596.com/reservation-platform/reservation-check" :
"http://test.msjk95596.com/reservation-platform/reservation-check";
    return new Promise((resolve, reject) => {
        v.axios.post(url, {
            'channelSourceKey': v.$url.parseUrl("oid"),
            "productCode": config[codeType]||config.productCode,
        }).then(res => {
            if (res.data.code == '0') {
                console.log(typeof codeType);
                if(typeof codeType=='function'){
                    callback=codeType
                }
                if(callback){
                    callback(res)
                    resolve()
                }else{
                    let contentList = JSON.parse(res.data.data);
                    Object.assign(this, contentList);
                    console.log(this)
                    resolve()
                }
            } else {
                resolve()
            }
        }).catch(err => {
            // reject()
        })
    })
};
var install = function(Vue, options) {
    Vue.prototype.$booking = booking;
}

export default {
    install: install
};

