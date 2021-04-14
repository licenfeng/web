import axios from 'axios';
import qs from 'qs';
import {GET, POST, UPLOAD, EXPORT} from './config';
import { Message } from 'element-ui';
import Router from '../router';
axios.defaults.withCredentials = true

const userName=  window.sessionStorage.getItem('token');
// const url='https://36604k9r21.goho.co/';
// const url = 'http://192.168.43.129:8080/';
// const url = 'http://192.168.43.76:8080/';
// const url = 'http://192.168.43.129:8080/';
// const url = "http://192.168.43.129:8080/";
const url = "http://172.20.10.2:8080/";
//创建一个axios实例 返回一个axios对象
const instanceGet = axios.create({
    baseURL: url,  //发送请求时会在url前面拼接 baseURL
    // timeout: 5000,
    //设置axios为form-data
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: [function (data) {
        let ret = '';
        if(data && !data.username ){
            data.username=userName;
        }
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }]
});
const instanceUpload =axios.create({
    baseURL: url,  //发送请求时会在url前面拼接 baseURL
    // timeout: 5000,
    //设置axios为form-data
    headers:{'Content-Type':'multipart/form-data'},
    transformRequest: [function (data) {
        if(data && !data.username ){
            data.username=userName;
        }
        return data;
    }]
});

const instanceExport =axios.create({
    baseURL: url,  //发送请求时会在url前面拼接 baseURL
    // timeout: 5000,
    //设置axios为form-data
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    responseType: 'blob',
    transformRequest: [function (data) {
        if(data && !data.username ){
            data.username=userName;
        }
        return data;
    }]
});

const instancePost = axios.create({
    baseURL: url,  //发送请求时会在url前面拼接 baseURL
    // timeout: 5000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: [function (data) {
        if(data && !data.username ){
            data.username=userName;
        }
        let reqData=qs.stringify(data)
        return reqData;
    }]
});

//抛出 request 方法 接收三个参数 1.请求方式 2.请求路径 3.传递的参数
export function request(methods, url, params) {
    switch (methods) {
        case GET:
            return get(url, params);  //把promise对象 返回
        case POST:
            return post(url, params)
        case UPLOAD:
            return upload(url,params);
        case EXPORT:
            return exportPost(url,params);
    }
}

//上传文件 ,请求后端要求的传输方式不一样
function upload(url,params) {
    let res=instanceUpload.post(url,params);
    return filter(res);
}

//下载文件
function exportPost(url,params) {
    let res=instanceExport.post(url,params);
    return filter(res);
}


//get请求
function get(url, params) {
    //axios请求  返回的是promise对象 有返回值 后续可以直接调用then catch 等方法\
    let res=instanceGet.get(url, params);
    return filter(res);
}
//post请求
function post(url, params) {
    let req=instancePost.post(url, params);
    return  filter(req);
}

function filter(req){
    req.then(res => {
        //返回参数是noLogin时，返回首页
        if (res.data.code === '403') {
                Router.push('/')
                Message.error({
                    message: '当前会话过期'
                })
            }
    });
    return req;
}