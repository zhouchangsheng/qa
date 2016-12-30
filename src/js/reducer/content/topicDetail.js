/**
 * Created by jerry on 2016/12/18.
 */
const UPDATE_TOPIC_DETAIL = "UPDATE_TOPIC_DETAIL";
const InitialState = {
};

export default( state = InitialState,action ) =>{
    switch( action.type ){
        case UPDATE_TOPIC_DETAIL:
            return action.text.topicDetail;

        default:
            return state;
    }
}