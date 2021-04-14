export const GET="get";
export const POST="post";
export const UPLOAD="upload";
export const EXPORT="export";
export const path ={
  getBreFieldExportInfoList:'/breTreatyCommon/getBreFieldExportInfoList',
  loginUrl:"/breUser/login",
  logoutUrl:"/breUser/logout",
  getFiledWorkIdList:"/breTreatyCommon/getFiledWorkIdList",
  getBreFieldInfoList:"/breTreatyCommon/getBreFieldInfoList",
  addBreFieldExportInfo:"/breTreatyCommon/addBreFieldExportInfo",
  deleteBreFieldExportInfo:"/breTreatyCommon/deleteBreFieldExportInfo",
  updateBreFieldExportInfo:"/breTreatyCommon/updateBreFieldExportInfo",
  getBreTreatyBasisInfoList:"/breTreatyBasisInfo/getBreTreatyBasisInfoList",
  getBreCustomerCompanyInfoList:"/breCustomerInfo/getBreCustomerCompanyInfoList",
  addBreCustomerCompanyInfo:"/breCustomerInfo/addBreCustomerCompanyInfo",
  getBreWordbookInfo:"/breTreatyCommon/getBreWordbookInfo",
  updateBreWordbookInfo:"/breTreatyCommon/updateBreWordbookInfo",
  addBreWordbookInfo:"/breTreatyCommon/addBreWordbookInfo",
  getBreWordbookInfoGroupByType:"/breTreatyCommon/getBreWordbookInfoGroupByType",
  getBreWordbookInfoGroupByKeyType:"/breTreatyCommon/getBreWordbookInfoGroupByKeyType",
  getBreCustomerContactsInfo:"/breCustomerInfo/getBreCustomerContactsInfo",
  updateBreCustomerContactsInfo:"/breCustomerInfo/updateBreCustomerContactsInfo",
  addBreCustomerContactsInfo:"/breCustomerInfo/addBreCustomerContactsInfo",
  getBreCurrencyInfoList:"/breCurrencyInfo/getBreCurrencyInfoList",
  getBreCountryRegionInfoList:"/breCountryRegionInfo/getBreCountryRegionInfoList",
  uploadCurrency:"/breCurrencyInfo/uploadCurrency",
  uploadCurrencyRegion:"/breCountryRegionInfo/uploadCurrencyRegion",
  exportBreTreatAllExcl:"/breTreatyCommon/exportBreTreatAllExcl",
  exportBreTreatAllCsv:"/breTreatyCommon/exportBreTreatAllCsv",
  addBreTreatyReinsureInfo:"/breTreatyBasisInfo/addBreTreatyReinsureInfo",//新增合约信息中的页面的排分信息
  updateBreTreatyBasisInfo:"/breTreatyBasisInfo/updateBreTreatyBasisInfo",//编辑新增增合约信息中页面的基础信息
  getBreTreatyAllInfoList:"/breTreatyBasisInfo/getBreTreatyAllInfoList",//传输id获取页面table页面的渲染
  updateBreTreatyPropInfo:"/breTreatyBasisInfo/updateBreTreatyPropInfo",//新增合约信息中的新增合约table编辑
  addBreTreatyArrangeAllInfo:"/breTreatyBasisInfo/addBreTreatyArrangeAllInfo", //这是新增合约页面中的排分信息增加项
  updateBreTreatyArrangeInfo:"/breTreatyArrangeInfo/updateBreTreatyArrangeInfo",//   修改Section 数据
  getBreTreatyArrangeInfoList:'/breTreatyArrangeInfo/getBreTreatyArrangeInfoList', //通过ID获取section数据
  getBreTreatyReinsurerInfoList:"/breTreatyReinsurerInfo/getBreTreatyReinsurerInfoList", // 再保人查询接口
  updateBreTreatyReinsurerInfo:"/breTreatyReinsurerInfo/updateBreTreatyReinsurerInfo", // 修改再保人form表单项
  addBreTreatyBasisInfo:"/breTreatyBasisInfo/addBreTreatyBasisInfo", //新增合约信息中页面的基础信息
  addBreTreatyPropAllInfo:"/breTreatyBasisInfo/addBreTreatyPropAllInfo",
  addBreTreatyPropInfo:"/breTreatyBasisInfo/addBreTreatyPropInfo", //新增合约信息中页面的合约信息
  selectBreTreatyPropInfo:"/breTreatyBasisInfo/selectBreTreatyPropInfo",
  getBreTreatyBasisInfo:"/breTreatyBasisInfo/getBreTreatyBasisInfo",
  updateBreCountryRegionInfo:"/breCountryRegionInfo/updateBreCountryRegionInfo",
  updateBreCurrencyInfo:"/breCurrencyInfo/updateBreCurrencyInfo",
  addBreTreatyNonPropInfo:"/breTreatyBasisInfo/addBreTreatyNonPropInfo",//添加非比例合约信息
  getBreTreatyBasisPropAllList:"/breTreatyBasisInfo/getBreTreatyBasisPropAllList",//查询非比例合约页面所有项
  getBreTreatyBasisNonPropAllList:"/breTreatyBasisInfo/getBreTreatyBasisNonPropAllList",//查询非比例合约页面所有项
  getBreTreatyNonPropInfoList:"/breTreatyBasisInfo/getBreTreatyNonPropInfoList",//查询非比例合约信息中的合约信息编辑查询
  updateBreTreatyNonPropInfo:"/breTreatyBasisInfo/updateBreTreatyNonPropInfo",//修改非比例合约信息中的合约信息
  getBreTreatyNonPropArrangeInfoList:"/breTreatyNonPropArrangeInfo/getBreTreatyNonPropArrangeInfoList",//查询layer的接口
  updateBreTreatyNonPropArrangeInfoInfo:'/breTreatyNonPropArrangeInfo/updateBreTreatyNonPropArrangeInfoInfo',//编辑layer的接口
  getLogInfo:"/breLogInfo/getBreLogInfoList", //获取操作日志
  getRenewNumber:"/breTreatyBasisInfo/getBreTreatyBasisPropAllListByBreSlipNumber",
};