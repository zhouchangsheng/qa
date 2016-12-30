/**
 * Created by jerry on 2016/12/16.
 */
import React from 'react';

import Row from '../Row';

class TopicHeader extends React.Component{
    render(){
        return(
            <Row className = "topicHeader">
                <Row className = "topicTitle">{ this.props.topicTitle }</Row>
                <Row className = "topicUserNickname" >{ this.props.userNickname }</Row>
            </Row>
        )
    }
}

export default TopicHeader;