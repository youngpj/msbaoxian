import Vue from 'vue'
import Router from 'vue-router'
import init from '../initPlugin';

var Index = () =>
    import ('@/page/indexPage/index.vue');
var Inform = () =>
    import ('@/page/informPage/index.vue');
var Insure = () =>
    import ('@/page/insurePage/index.vue');
var Confirm = () =>
    import ('@/page/confirmPage/index.vue');
var Paysuccess = () =>
    import ('@/page/paysuccessPage/index.vue');
var PayFail = () =>
    import ('@/page/payFailPage/index.vue');
var Select = () =>
    import ('@/page/selectPage/index.vue');
var Provisionseb = () =>
    import ('@/page/provisionPage/index.vue');
var Provisionkeb = () =>
    import ('@/page/provisionPage/index_keb.vue');
var Xuzhi = () =>
    import ('@/page/provisionPage/toubaoxuzhi.vue');

Vue.use(Router);

var routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        meta:{
            hmtName:'/landingpage'
        }
    },
    {
        path: '/selectpage',
        name: 'SelectPage',
        component: Select,
        meta:{
            hmtName:'/home'
        }
      
    },
    {
        path: '/inform',
        name: 'Inform',
        component: Inform,
        meta:{
            hmtName:'/health'
        }
    },
    {
        path: '/insure',
        name: 'Insure',
        component: Insure,
        meta:{
            hmtName:'/insure'
        }
    },
    {
        path: '/confirm',
        name: 'Confirm',
        component: Confirm,
        meta:{
            hmtName:'/confirm'
        }
    },
    { path: '/paysuccess', name: 'Paysuccess', component: Paysuccess , meta:{hmtName:'/success'}},
    { path: '/payfail', name: 'PayFail', component: PayFail , meta:{hmtName:'/failure'}},
    { path: '/provisionseb', name: 'Provisionseb', component: Provisionseb , meta:{hmtName:'/provisionseb'} },
    { path: '/provisionkeb', name: 'Provisionkeb', component: Provisionkeb, meta:{hmtName:'/provisionkeb'} },
    { path: '/xuzhi', name: 'Xuzhi', component: Xuzhi, meta:{hmtName:'/xuzhi'} }
];

export default new Router({
    routes: routes
});