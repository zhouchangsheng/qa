/**
 * Created by jerry on 2016/12/15.
 */
import React from 'react';

import TopicDetailContent from './TopicDetailContent';
import NavBack from '../../../../component/NavBack';
import NavContentContainer from '../../../../component/NavContentContainer';

class TopicDetailContainer extends React.Component{
    render() {
        return (
            <NavContentContainer
                nav = { <NavBack /> }
            >
                <TopicDetailContent />
            </NavContentContainer>
        )
    }
}


export default TopicDetailContainer;