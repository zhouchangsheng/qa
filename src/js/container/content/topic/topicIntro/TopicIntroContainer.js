/**
 * Created by jerry on 2016/12/18.
 */
import React from 'react';

import TopicIntroList from '../../../../component/topic/TopicIntroList';
import TopicHeader from './TopicHeader';
import Row from '../../../../component/Row';

class TopicIntroContainer extends React.Component{
    render(){
        return(
            <Row styleCss={{paddingBottom:"100px"}}>
                <Row
                    styleCss = {{
                        position: "fixed",
                        width: "100%",
                        zIndex: 2,
                        backgroundColor:"#f5f5f9"
                    }}
                >
                    <TopicHeader />
                </Row>
                <Row styleCss = {{ paddingTop:"80px" }}>
                    <TopicIntroList
                        topicList = { this.props.topicList }
                        curUserId = { this.props.curUserId }
                    />
                </Row>
            </Row>
        )
    }
}

export default TopicIntroContainer;