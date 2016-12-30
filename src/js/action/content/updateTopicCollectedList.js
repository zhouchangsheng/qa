/**
 * Created by jerry on 2016/12/21.
 */
const UPDATE_TOPIC_COLLECTED_LIST = "UPDATE_TOPIC_COLLECTED_LIST";

export function updateTopicCollectedList( dataArr ){
    return{
        type: UPDATE_TOPIC_COLLECTED_LIST,
        text: {
            topicCollectedList: dataArr
        }
    }
}