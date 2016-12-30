/**
 * Created by jerry on 2016/12/18.
 */

import { Modal,Toast } from 'antd-mobile';
import Jquery from 'jquery';

let IP = "http://192.168.31.37:8080/";
let PROJECT_NAME = "studenthouse";

let URL_OF_OLD_USER_VALIDATE = IP + PROJECT_NAME + "/api/users/login";
let URL_OF_NEW_USER_VALIDATE = IP + PROJECT_NAME + '/api/student/validate';
let URL_OF_TOPIC_RELEVANT_WITH_USER = IP + PROJECT_NAME + '/api/notes';
let URL_OF_DELETE_TOPIC = IP + PROJECT_NAME + '/api/notes/{noteId}/delete';
let URL_OF_COLLECT_TOPIC = IP + PROJECT_NAME + '/api/collections/add';
let URL_OF_CANCEL_COLLECT_TOPIC = IP + PROJECT_NAME + '/api/collections/delete';
let URL_OF_UPLOAD_TOPIC = IP + PROJECT_NAME + '/api/notes/add';
let URL_OF_BASIC_INFO_VALIDATE = IP + PROJECT_NAME + '/api/users/validate';
let URL_OF_UPDATE_COLLECT_TOPIC = IP + PROJECT_NAME + '/api/collections/{userId}';
let URL_OF_ADD_NEW_USER = IP + PROJECT_NAME + '/api/users/add';


import * as updateUserInfoAction  from '../action/updateUserInfo';
import * as updateTopicListAction from '../action/content/updateTopicList';
import * as updateTopicCollectedListAction from '../action/content/updateTopicCollectedList';

/**
 * @alias 提示框
 * @param tipTitle 提示标题
 * @param tipContent 提示内容
 * @param tipPressText 按钮文本
 * */
function alertTip( tipTitle,tipContent,tipPressText ){
    Modal.alert(
        tipTitle?tipTitle:"提示",
        tipContent?tipContent:"没有提示内容",
        [
            {
                text:tipPressText?tipPressText:"确定"
            }
        ]
    );
}

/**
 * @alis 替换 note
 * @param originURL 初始URL
 * @param noteIdOfURL topicID
 * @return
 * */
function mergeURL( originURL,noteIdOfURL ){
    if(/\{[A-z,0-9,_]+\}/g.test(originURL)){
        originURL = originURL.replace(/\{[A-z,0-9,_]+\}/g,noteIdOfURL)
    }
    return originURL;
}

/**
 * @alias 方法验证
 * @param method 请求服务的方法
 * @return 是否支持该服务的布尔值
 * */
function methodValidate( method ) {
    let methods = ["post","get"];
    let methodValidate = function( method,methods ){
        method = method.trim().toLowerCase();
        return methods.indexOf( method ) >= 0;
    };

    if( typeof method === "string" && methodValidate(method,methods)){
        return true;
    }else{
        alertTip("错误提示","请求方法不支持","知道了");
        return false;
    }
}

/**
 * @alias json stringify验证
 * @param jsonObj 数据对象集合
 * @return false 或json字符串
 **/
function jsonStringify( jsonObj ){
    let result;
    try{
        result = JSON.stringify( jsonObj );
    }catch( e ){
        result = false;
        alertTip("错误提示","JSON字符串序列化错误","知道了");
    }

    return result;
}

/**
 * @alias json字符串 parse解析
 * @param jsonStr json字符串
 * @return json对象
 * */
function jsonParse( jsonStr ){
    let result;
    try{
        result = JSON.parse( jsonStr );
    }catch( e ){
        alertTip("错误提示","JSON字符串解析错误","知道了");
        result = false;
    }

    return result;
}

/**
 * @alias jsonData2url
 * @param jsonObj
 * @return url
 * */
function objToURL(jsonObj){
    let url = "",key;
    for(key in jsonObj){
        url += key + "=" + jsonObj[key].toString()+"&";
    }

    if( /&$/g.test(url)){
        url = url.replace(/&$/g,"");
    }

    return url;
}

/**
 * @alias ajax
 * @param method 请求方法
 * @param url 请求地址
 * @param data 请求数据
 * @param func 回调函数
 * @param processTipText 加载文本显示，默认为加载
 * @param toastFunc 服务请求成功后的toast回调函数
 * @param errorTip 是否显示加载过程，默认显示
 * */
function ajax( method,url,data,func,processTipText,errorTip,toastFunc ) {
    errorTip = typeof errorTip ==="boolean"?errorTip:true;
    processTipText = typeof processTipText === "string"?processTipText:"加载";
    errorTip?Toast.loading( processTipText + "中...",120):"";

    let ajaxConfig = {
        type:method,
        contentType:'application/json;charset=utf-8',
        //url:url,
        //data:jsonStr,
        timeout:30000,
        dataType:'json',
        success:function( responseData ){
            let errorCode = parseInt( responseData.errorCode );

            if( errorCode === 0 ){
                func?func(responseData.data,responseData):"";
                errorTip?Toast.hide():"";
                errorTip?Toast.success( processTipText + "成功",2,toastFunc ):"";
            }else if(errorCode ===20001 ){
                Toast.hide();
                alertTip("错误提示","账号或密码不正确","确定");
            }else if(errorCode ===20002 ){
                Toast.hide();
                alertTip("错误提示","学号或密码不正确","确定");
            }else if(errorCode ===30001 ){
                Toast.hide();
                alertTip("信息提示","无相关数据","确定");
            }else{
                Toast.hide();
                alertTip("错误提示",responseData.errorMsg,"确定");
            }
        },
        error:function(xhr,status,error){
            Toast.hide();

            if( status == "timeout" ){
                Toast.offline("请求超时",3);
            }else if( status == "error"){
                Toast.fail("网络错误",3);
            }else if( status == "abort"){
                Toast.fail("网络错误",3);
            }else if( status == "parserror"){
                Toast.fail("数据解析错误",3);
            }else{
                Toast.fail("未知错误"+status,3);
            }
        }
    };

    switch ( method.toLowerCase() ){
        case "post":
            ajaxConfig.url = url;
            let jsonStr = jsonStringify( data );
            if( jsonStr ){
                ajaxConfig.data = jsonStr;
            }else{
                return;
            }
            break;

        case "get":
            ajaxConfig.url = url + "?" + objToURL(data);

            break;
    }

    Jquery.ajax(ajaxConfig);

}


/**
 * @alias service服务及服务产生前的验证
 * @param method 请求方法
 * @param url 请求地址
 * @param data 请求数据
 * @param func 回调函数
 * @param processTipText 加载文本显示，默认为加载
 * @param toastFunc 服务请求成功后的toast回调函数
 * @param errorTip 是否显示加载过程，默认显示
 * */
function service( method,url,data,func,processTipText,errorTip,toastFunc ){
    if( !methodValidate( method ) ){
        return;
    }

    if( typeof url !=="string" ){
        alertTip("错误提示","服务地址错误","知道了");
        return;
    }

    ajax( method,url,data,func,processTipText,errorTip,toastFunc );
}

/**
 * @alias 获取topic
 * @param jsonData
 * @param optType
 * @param spinTip
 * @param spinTipText
 * */
export function getTopic( jsonData,optType,spinTip,spinTipText,func ){
    return (dispatch,getState) =>{
        service("GET",URL_OF_TOPIC_RELEVANT_WITH_USER,jsonData,function( responseData ){
            dispatch( updateTopicListAction.updateTopicList(responseData , optType) );
        },spinTipText?spinTipText:"获取topic",typeof spinTip ==="boolean"?spinTip:false,func);
    }
}

/**
 * @alias 老用户验证
 * @param jsonData
 * @param pushFunc
 * */
export function validateOldUser( jsonData,pushFunc ){
    return (dispatch,getState)=>{
        service("post",URL_OF_OLD_USER_VALIDATE,jsonData,function( responseData ){
            dispatch( updateUserInfoAction.updateUserInfo( responseData ) );
            dispatch( getTopic( { userId:responseData.userId,limit:10,offset:0}) );
        },"验证",true,pushFunc );
    }

}

/**
 * @alias 学生验证
 * @param jsonData
 * @param pushFunc
 * */
export function validateNewUser( jsonData,pushFunc ){
    return (dispatch,getState)=>{
        service("post",URL_OF_NEW_USER_VALIDATE,jsonData,function( responseData ){
            responseData.userSchool = jsonData.userSchool;
            //console.log(responseData,"\n\n");
            dispatch( updateUserInfoAction.updateUserInfo( responseData ) );
        },"验证",true,pushFunc );
    }

}


/**
 * @alias 删除topic
 * @param jsonData
 * @param noteId 要删除的topicId
 * */
export function deleteTopic( noteId,jsonData ){
    return (dispatch,getState)=>{
        service("post",mergeURL(URL_OF_DELETE_TOPIC,noteId ),jsonData?jsonData:[],function(responseData){
            dispatch( updateTopicListAction.updateTopicList(null,'delete',noteId ));
        },"删除",true);
    }
}


/**
 * @alias 收藏topic
 * @param jsonData
 * @param func
 * */
export function collectTopic( jsonData,func ){
    service("post",URL_OF_COLLECT_TOPIC,jsonData,function(responseData){
        func?func():"";
    },'收藏',false);
}

/**
 * @alias 取消收藏topic
 * @param jsonData
 * @param func
 * */
export function cancelCollectTopic( jsonData,func ){
    service("post",URL_OF_CANCEL_COLLECT_TOPIC,jsonData,function(responseData){
        func?func():"";
    },'取消收藏',false);
}

/**
 * @alias 验证用户信息是否被使用
 * @param jsonData
 * @param func 回调函数
 * */
export function validateBasicInfo( jsonData,func ){
    service("post",URL_OF_BASIC_INFO_VALIDATE,jsonData,function(responseData,response){
        func?func(response):"";
    },'用户信息验证',false);
}

/**
 * @alias 上传topic
 * @param jsonData
 * @param jsonDataOfGetTopic
 * @param func
 * */
export function uploadTopic( jsonData,jsonDataOfGetTopic,func ){
    return (dispatch,getState)=>{
        service("post",URL_OF_UPLOAD_TOPIC,jsonData,function(responseData){
            dispatch( getTopic( jsonDataOfGetTopic,"insertAfter") );
        },"发布",true,func);
    }
}

/**
 * @alias 获取收藏的topic
 * @param userId 用户ID
 * @param func 回调函数
 * */
export function getCollectTopic( userId,func ){
    return (dispatch,getState )=>{
        service("get",mergeURL(URL_OF_UPDATE_COLLECT_TOPIC,userId),{},function(responseData){
            dispatch( updateTopicCollectedListAction.updateTopicCollectedList(responseData) );
        },"加载",true,func)
    }
}

/**
 * @alias 上刷新更新最新数据
 * @param obj
 * @param func 回调函数
 * */
export function updateLatestTopic( obj,func ){
    let jsonData = {
        userId: obj.userId,
        limit: 10,
        offset: 0,
        afterCreateTime: obj.afterCreateTime
    };

    return (dispatch,getState)=>{
        dispatch( getTopic( jsonData,"insertAfter",true,"更新",func) );
    }
}

/**
 * @alias 下刷新更新以前数据
 * @param obj
 * @param func 回调函数
 * */
export function updateFormerTopic( obj,func ){
    let jsonData = {
        userId: obj.userId,
        limit: 10,
        offset: 0,
        beforeCreateTime: obj.beforeCreateTime
    };

    return (dispatch,getState)=>{
        dispatch( getTopic( jsonData,"insertBefore",true,"更新",func) );
    }
}

/**
 * @alias 添加新用户
 * @param jsonData
 * @param func
 * */
export function addNewUser( jsonData,func ){
    return (dispatch,getState)=>{
        service("post",URL_OF_ADD_NEW_USER,jsonData,function( responseData ){
            //console.log(responseData);
            dispatch( updateUserInfoAction.updateUserInfo( responseData ) );
            dispatch( getTopic( { userId:responseData.userId,limit:10,offset:0}) );
        },"加载",true,func );
    }
}