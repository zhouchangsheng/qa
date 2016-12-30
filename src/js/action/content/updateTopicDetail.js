/**
 * Created by jerry on 2016/12/18.
 */

const UPDATE_TOPIC_DETAIL = "UPDATE_TOPIC_DETAIL";

export function updateTopicDetail( data ){
    return {
        type: UPDATE_TOPIC_DETAIL,
        text: {
            topicDetail: data
        }
    }
}

