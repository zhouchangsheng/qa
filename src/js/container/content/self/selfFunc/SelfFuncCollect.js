/**
 * Created by jerry on 2016/12/19.
 */
import React from 'react';

import { connect } from 'react-redux';

import NavContentContainer from '../../../../component/NavContentContainer';
import NavBack from '../../../../component/NavBack';
import TopicIntroList from '../../../../component/topic/TopicIntroList';

class SelfFuncCollect extends React.Component{

    render(){
        return(
            <NavContentContainer
                nav = {<NavBack/>}
                title = "个人收藏"
            >
                <TopicIntroList
                    topicList = { this.props.topicCollectedList }
                />
            </NavContentContainer>
        )
    }
}

function mapStateToProps( state ){
    return {
        topicCollectedList: state.content.topicCollectedList,
    }
}



export default connect(mapStateToProps,null)( SelfFuncCollect );