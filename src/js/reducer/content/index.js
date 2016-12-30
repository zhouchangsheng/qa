/**
 * Created by jerry on 2016/12/18.
 */
import { combineReducers } from 'redux';

import topicDetail from './topicDetail';
import topicList from './topicList';
import topicCollectedList from './topicCollectedList';

export default combineReducers({
    topicDetail: topicDetail,
    topicList: topicList,
    topicCollectedList: topicCollectedList,
})