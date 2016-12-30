/**
 * Created by jerry on 2016/12/20.
 */
const UPDATE_TOPIC_LIST = "UPDATE_TOPIC_LIST";

export function updateTopicList( dataArr,optType,topicId ){
    return{
        type: UPDATE_TOPIC_LIST,
        text: {
            topicList:dataArr,
            addition:{
                type: optType?optType:"insert",
                topicId:topicId
            }
        }
    }
}