/**
 * Created by jerry on 2016/12/16.
 */
import { combineReducers } from 'redux';

import userInfo from './userInfo'
import content from './content/index';

export default combineReducers({
    content: content,
    userInfo: userInfo
});