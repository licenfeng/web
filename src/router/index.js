import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Editor from '../components/master/Editor.vue'
import Echarts from '../components/master/Echarts.vue'
import BreFieldExportInfo from '../components/breField/BreFieldExportInfo'
import BreCustomerCompanyAdd from '../components/breCustomerCompany/BreCustomerCompanyAdd'
import breTreatyInfo from '../components/breTreaty/BreTreatyInfo'
import BreWordbookInfoIndex from '../components/breWordbookInfo/index'
// import BreFieldInfo from '../components/breField/BreFieldInfo'
import BreWordBookInfoAdd from "../components/breWordbookInfo/BreWordBookInfoAdd"
import BreCustomerContactsIndex from "../components/breCustomerCompany/BreCustomerContactsIndex"
import BreCustomerContactsAdd from "../components/breCustomerCompany/BreCustomerContactsAdd"
// import BreCountry from "../components/breCountry/index"
import Page3 from '../components/breTreaty/page3'
import Page4 from '../components/breTreaty/page4'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        component: Login
    },
    ,
    {
        path: '/login',
        component: Login
    },
    {
        path: '/logout',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        redirect: '/breTreatyInfo',
        children: [
            {
                path: '/page3',
                component: Page3
            },
            // {
            //     path: '/page4',
            //     component: () => import("@/components/breTreaty/page4.vue")
            // },
            {
                path: '/editor',
                component: Editor
            },
            {
                path: '/echarts',
                component: Echarts
            },
            {
                path: '/breFieldExportInfo',
                component: BreFieldExportInfo
            },
            {
                path: '/breCustomerContactsIndex',
                component: BreCustomerContactsIndex
            },
            {
                path: '/breTreatyInfo',
                component: breTreatyInfo
            },
            {
                path: '/breWordbookInfoIndex',
                component: BreWordbookInfoIndex
            },
            {
                path: '/breWordBookInfoAdd',
                component: BreWordBookInfoAdd
            },
            {
                path: '/BreFieldInfo',
                component:() => import('@/components/breField/BreFieldInfo.vue')
            },
            {
                path: '/breCustomerContactsAdd',
                component: BreCustomerContactsAdd
            },
            {
                path: '/indexExcel',
                component: () => import('../components/breCountry/indexUpload')
            },
            {
                path: '/breCustomerCompanyIndex',
                component: () => import('../components/breCustomerCompany/index')
            },
            {
                path: '/breCountryRegionIndex',
                component: () => import('../components/breCountryRegion/index')
            },
            {
                path: '/breCustomerCompanyAdd',
                component: BreCustomerCompanyAdd
            },
            {
                path: '/breCountry',
                component: () => import('@/components/breCountry/index.vue')
            },
            //新增页面中的合约信息编辑页
            {
                path: '/editBasicsInfo',
                component: ()=>import("../components/breTreaty/components/editBasicsInfo.vue")
            },
            {
                path:'/addpage4',
                component:() =>import('../components/breTreaty/components/addpage4.vue')
            },
            {
                path:'/editpage4',
                name:"editpage4",
                component:() =>import('../components/breTreaty/components/editpage4.vue')
            },
            //添加基础信息的页面
            {
                path:'/basicsInfo',
                component: () => import('../components/breTreaty/components/basicsInfo.vue')
            },
            //新增比例合约的排分信息
            {
                path:'/addformpage4',
                component:() =>import('../components/breTreaty/components/addformpage4.vue')
            },
            //编辑比例合约的排分信息
            {
                path:'/editformpage4',
                name:"editformpage4",
                component:() =>import('../components/breTreaty/components/editformpage4.vue')
            },
            //编辑排分信息的再保人信息
            {
                path:'/editformpage4two',
                name:"editformpage4two",
                component:() =>import('../components/breTreaty/components/editformpage4two.vue')
            },
            // {
            //     path: '/page3',
            //     component: Page3
            // },
            {
                path: '/page4',
                name:"Page4",
                component: Page4
            },
            //编辑比例合约信息页面
            {
                path:'/addTreatyInfo',
                component: () => import('@/components/breTreaty/addTreatyInfo')
            },

              //编辑比例合约信息页面
            {
                path:'/editContract',
                component: () => import('@/components/editContract')
            },
            //编辑非比例合约的基础信息
            {
                path:"/editNoBasicsInfo",
                component:() => import('@/components/editContract/components/editNoBasicsInfo.vue')
            },
            //添加排分信息的页面
            {
                path:"/suspendTable",
                name:"suspendTable",
                component:() => import('@/components/editContract/components/suspendTable.vue')
            },
             //编辑非比例合约的合约信息
            {
                path:"/editContractForm",
                name:"editContractForm",
                component:() => import('@/components/editContract/components/editContractForm.vue')
            },
            {
                path:"/editArrangeForm",
                name:"editArrangeForm",
                component:() => import("@/components/editContract/components/editArrangeForm.vue")
              },
              //增加非比例合约的基础信息
            {
                path:"/addNoBasicsInfo",
                component:() => import('@/components/editContract/components/addNoBasicsInfo.vue')
            },
             //增加非比例合约的合约信息
            {
                path:"/addContractForm",
                component:() => import('@/components/editContract/components/addContractForm.vue')
            },
            //添加非比例合约信息的排分信息
            {
                path:"/addArrangeForm",
                name:"addArrangeForm",
                component:() => import('@/components/editContract/components/addArrangeForm.vue')
            },
        ]
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    // 获取token
    // let token = window.sessionStorage.getItem('token');
    // console.log(to.path)
    // if (to.path === '/') {
    //     if (token) {
    //         return next('/home')
    //     }

    // }
    // console.log(to.path)
    // if (to.path === '/login') {
    //     return next()
    // }
    // if (to.path === '/logout') {
    //     window.sessionStorage.setItem("token", "");
    //     return next('/login')
    // }
    // // 获取token
    // if (!token) {
    //     return next('/login')
    // }
    next();
})
export default router
