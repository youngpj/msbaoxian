import shareIcon from '@/assets/image/eImg/shareIcon.jpg'
// import shareIcon from '@/assets/image/eImg/select_banner.jpg'
// var apiDomain = '';

// if (/activitytest/.test(location.origin)) {
//     apiDomain = '/stargate_2';
// }

var apiDomain = (/activity.minshenglife/.test(location.origin))?'/ins':'/ins';

// if (/activitytest/.test(location.origin)) {
//   location.pathname.split("/").forEach(item => {
//     if (/stargate_/.test(item)) {
//       apiDomain = `/${item}`
//     }
//   })
// }

// var querysource = encodeURIComponent(`source=share&agentId=${localStorage.AGENTID}`)
var config = {
  productCode_keb: '111807',//康e保
  productCode: '511701',//随意宝
  defaultShareOption: {
    title: '老司机随e保·定制自己的健康保障',
    desc: '不做韭菜，要做保险老司机',
    imgUrl: shareIcon,
    link: `${location.origin}${location.pathname}?source=share&agentId=${localStorage.AGENTID}`
  },
  apiDomain: apiDomain,
  queryUrl: getQueryUrl(),
  // detailUrl: getDetailUrl(),

  test_yingshe:"",
  // test_yingshe:"/insb2",
}

// function getActiveUrl() {
//   var url = '';
//   if (/test/.test(location.origin)) {
//     url = "http://test.msjk95596.com/ly/index.html?source=1_1";
//   } else {
//     url = "http://www.msjk95596.com/ly/index.html?source=1_1";
//   };
//   return url;
// }

function getQueryUrl() {
  var url = '';
  var devAuthUrl = 'http://test.msjk95596.com/act/wechat/base/access_token/?state=';
  var prodAuthUrl = 'http://www.msjk95596.com/act/wechat/base/access_token/?state=';
  if (/test/.test(location.origin)) {
    url = devAuthUrl + location.origin + '/i/web/index.html';
  } else {
    url = prodAuthUrl + 'http://activity.minshenglife.com/i/web/index.html';
  };

  return url;
}

function getDetailUrl() {
  var url = '';
  // var devAuthUrl = 'http://test.msjk95596.com/act/wechat/base/access_token/?state=';
  // var prodAuthUrl = 'http://www.msjk95596.com/act/wechat/base/access_token/?state=';
  if (/test/.test(location.origin)) {
    url = location.origin + apiDomain + '/html/taxfreePolicydetail.html';
  } else {
    url = 'http://health.minshenglife.com/html/taxfreePolicydetail.html';
  };

  return url;
}

export default config;
