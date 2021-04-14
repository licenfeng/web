import {GET, POST, path, UPLOAD, EXPORT} from './config';
import {request} from './core'; //引入core模块中抛出的request方法

const newWork = {
    getBreFieldExportInfoList(params) {
        return request(POST, path.getBreFieldExportInfoList, params)
    },
    getLogin(params) {
        return request(POST, path.loginUrl, params)
    },
    logout(params) {
        return request(POST, path.logoutUrl, params)
    },
    getFiledWorkIdList(params) {
        return request(POST, path.getFiledWorkIdList, params)
    },
    getBreFieldInfoList(params) {
        return request(POST, path.getBreFieldInfoList, params)
    },
    addBreFieldExportInfo(params) {
        return request(POST, path.addBreFieldExportInfo, params)
    },
    deleteBreFieldExportInfo(params) {
        return request(POST, path.deleteBreFieldExportInfo, params)
    },
    updateBreFieldExportInfo(params) {
        return request(POST, path.updateBreFieldExportInfo, params)
    },

    getBreTreatyBasisInfoList(params) {
        return request(POST, path.getBreTreatyBasisInfoList, params)
    },
    getBreCustomerCompanyInfoList(params) {
        return request(POST, path.getBreCustomerCompanyInfoList, params)
    },

    addBreCustomerCompanyInfo(params) {
        return request(POST, path.addBreCustomerCompanyInfo, params)
    },
    getBreWordbookInfo(params) {
        return request(POST, path.getBreWordbookInfo, params)
    },

    updateBreWordbookInfo(params) {
        return request(POST, path.updateBreWordbookInfo, params)
    },
    addBreWordbookInfo(params) {
        return request(POST, path.addBreWordbookInfo, params)
    },
    getBreWordbookInfoGroupByType(params) {
        return request(POST, path.getBreWordbookInfoGroupByType, params)
    },
    getBreWordbookInfoGroupByKeyType(params) {
        return request(POST, path.getBreWordbookInfoGroupByKeyType, params)
    },
    getBreCustomerContactsInfo(params) {
        return request(POST, path.getBreCustomerContactsInfo, params)
    },
    updateBreCustomerContactsInfo(params) {
        return request(POST, path.updateBreCustomerContactsInfo, params)
    },
    addBreCustomerContactsInfo(params) {
        return request(POST, path.addBreCustomerContactsInfo, params)
    },

    getBreCurrencyInfoList(params) {
        return request(POST, path.getBreCurrencyInfoList, params)
    },

    getBreCountryRegionInfoList(params) {
        return request(POST, path.getBreCountryRegionInfoList, params)
    },
    uploadCurrency(params) {
        return request(UPLOAD, path.uploadCurrency, params)
    },
    uploadCurrencyRegion(params) {
        return request(UPLOAD, path.uploadCurrencyRegion, params)
    },
    exportBreTreatAllExcl(params) {
        return request(EXPORT, path.exportBreTreatAllExcl, params)
    },

    getBreTreatyBasisInfo(params) {
        return request(POST, path.getBreTreatyBasisInfo, params)
    },

    //合约信息添加接口
    addBreTreatyPropInfo(params) {
        return request(POST, path.addBreTreatyPropInfo, params)
    },
    //搜索项
    selectBreTreatyPropInfo(params) {
        return request(POST, path.selectBreTreatyPropInfo, params)
    },
    //新增页面中的排分信息
    addBreTreatyReinsureInfo(params) {
        return request(POST, path.addBreTreatyReinsureInfo, params)
    },
    //新增页面基础信息编辑接口
    updateBreTreatyBasisInfo(params) {
        return request(POST, path.updateBreTreatyBasisInfo, params)
    },
    //获取新增页面的所有table信息
    getBreTreatyAllInfoList(params) {
        return request(POST, path.getBreTreatyAllInfoList, params)
    },
    //新增合约信息中的新增合约table编辑
    updateBreTreatyPropInfo(params) {
        return request(POST, path.updateBreTreatyPropInfo, params)
    },
    //新增合约信息中的排分信息项
    addBreTreatyArrangeAllInfo(params) {
        return request(POST, path.addBreTreatyArrangeAllInfo, params)
    },
    // //修改Section 数据
    updateBreTreatyArrangeInfo(params) {
        return request(POST, path.updateBreTreatyArrangeInfo, params)
    },
    //通过section的id获取Section 数据
    getBreTreatyArrangeInfoList(params) {
        return request(POST, path.getBreTreatyArrangeInfoList, params)
    },
    //通过id和slip number 查询再保人信息
    getBreTreatyReinsurerInfoList(params) {
        return request(POST, path.getBreTreatyReinsurerInfoList, params)
    },
    //修改再保人form表单项接口
    updateBreTreatyReinsurerInfo(params) {
        return request(POST, path.updateBreTreatyReinsurerInfo, params)
    },
    addBreTreatyBasisInfo(params) {
        return request(POST, path.addBreTreatyBasisInfo, params)
    },

    updateBreCountryRegionInfo(params) {
        return request(POST, path.updateBreCountryRegionInfo, params)
    },

    updateBreCurrencyInfo(params) {
        return request(POST, path.updateBreCurrencyInfo, params)
    },
    //非比例合约信息中的增加合约合约信息
    addBreTreatyNonPropInfo(params){
        return request(POST, path.addBreTreatyNonPropInfo,params)
    },
    //查询非比例合约的所有table数据
    getBreTreatyBasisNonPropAllList(params){
        return request(POST, path.getBreTreatyBasisNonPropAllList,params)
    },
    //查询非比例合约信息中的合约信息编辑查询
    getBreTreatyNonPropInfoList(params){
        return request(POST,path.getBreTreatyNonPropInfoList,params)
    },
    //修改非比例合约信息中的合约信息编辑修改
    updateBreTreatyNonPropInfo(params){
        return request(POST, path.updateBreTreatyNonPropInfo,params)
    },
    //查询layer的接口
    getBreTreatyNonPropArrangeInfoList(params){
        return request(POST, path.getBreTreatyNonPropArrangeInfoList,params)
    },
    //编辑layer的数据
    updateBreTreatyNonPropArrangeInfoInfo(params){
        return request(POST,path.updateBreTreatyNonPropArrangeInfoInfo,params)
    },
    //获取所有的table信息 新增合约信息
    getBreTreatyBasisPropAllList(params){
        return request(POST,path.getBreTreatyBasisPropAllList,params)
    },
    //获取所有的select选项的参数
    getBreWordbookType(val) {
        let params={"type":val};
        return request(POST, path.getBreWordbookInfoGroupByKeyType, params)
    },
    //获取日志信息
    getLogInfo(val) {
        let params={"keyValue":val};
        return request(POST, path.getLogInfo, params)
    },
    //RenewNumber
    getRenewNumber(val){
        let params={"keyValue":val};
        return request(POST, path.getRenewNumber, params)
    }
};
//抛出newWork
export default newWork;