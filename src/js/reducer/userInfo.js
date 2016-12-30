/**
 * Created by jerry on 2016/12/16.
 */

const UPDATE_USER_INFO = "UPDATE_USER_INFO";
const InitialState = {

};

export default( state = InitialState,action ) =>{
    switch( action.type ){
        case UPDATE_USER_INFO:
            return action.text.userInfo;

        default:
            return state;
    }
}