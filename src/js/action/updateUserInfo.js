/**
 * Created by jerry on 2016/12/19.
 */
const UPDATE_USER_INFO = "UPDATE_USER_INFO";

export function updateUserInfo( data ){
    return {
        type: UPDATE_USER_INFO,
        text: {
            userInfo: data
        }
    }
}