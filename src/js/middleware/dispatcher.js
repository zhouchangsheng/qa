/**
 * Created by jerry on 2016/12/18.
 */

import * as updateTopicDetailAction from '../action/content/updateTopicDetail';
import * as updateUserInfoAction  from '../action/updateUserInfo';
import * as updateTopicListAction from '../action/content/updateTopicList';

/**
 *  @alias 更新store中详细的topic
 *  @param topicDetail topic数据对象
 * */
export function updateTopicDetail2Store( topicDetail ){
    return (dispatch,getState ) =>{
        dispatch( updateTopicDetailAction.updateTopicDetail(topicDetail) );
    }
}

/**
 * @alias 退出系统
 * */
export function logoutAndClearState( func ){
    return (dispatch,getState)=>{
        dispatch( updateUserInfoAction.updateUserInfo({}));
        dispatch( updateTopicListAction.updateTopicList( [],"clear" ) );
        func?func():"";
    }
}

