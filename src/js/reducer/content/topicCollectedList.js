/**
 * Created by jerry on 2016/12/21.
 */
const UPDATE_TOPIC_COLLECTED_LIST = "UPDATE_TOPIC_COLLECTED_LIST";
const InitialState = [];

export default( state = InitialState,action ) =>{
    switch( action.type ){
        case UPDATE_TOPIC_COLLECTED_LIST:
            return action.text.topicCollectedList;

        default:
            return state;
    }
}