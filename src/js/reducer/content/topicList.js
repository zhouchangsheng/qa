/**
 * Created by jerry on 2016/12/20.
 */
const UPDATE_TOPIC_LIST = "UPDATE_TOPIC_LIST";
const InitialState = [];

export default( state = InitialState,action ) =>{
    switch( action.type ){

        case UPDATE_TOPIC_LIST:
            let mergeState = updateTopic( state,action.text );
            return mergeState;

        default:
            return state;
    }
}

/**
 * @alias 更新数据
 * @param state 之前状态
 * @param textObj action.text;
 * */
function updateTopic( state,textObj ){
    let mergeState = state;

    let optType = textObj.addition.type;
    let topicId = textObj.addition.topicId;
    let topicList = textObj.topicList;

    switch( optType ){
        case "insert":
        case "insertAfter":
            mergeState = topicList.concat(mergeState);
            break;

        case "insertBefore":
            mergeState = mergeState.concat(topicList);
            break;

        case "delete":
            mergeState = deleteTopic( state,topicId );
            break;

        case "clear":
            mergeState = [];
            break;
    }

    return mergeState;
}

/**
 * @alias 删除某一数据
 * @param state 状态数组
 * @param topicId
 * */
function deleteTopic( state,topicId ){
    let stateLength = state.length,noteId;
    topicId = ""+topicId;

    for(let i=0;i<stateLength;i++){
        noteId = ""+state[i].noteId;
        if( noteId === topicId){
            state.splice(i,1);
            break;
        }
    }

    return state;
}

