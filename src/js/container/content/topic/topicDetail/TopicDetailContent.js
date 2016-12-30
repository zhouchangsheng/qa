/**
 * Created by jerry on 2016/12/15.
 */
import React from 'react';
import { connect } from 'react-redux';

import Row from '../../../../component/Row';
import TopicDetail from '../../../../component/topic/TopicDetail';

class TopicDetailContent extends React.Component{
    render() {
        let topicDetail = this.props.topicDetail;

        return (
            <Row>
                <Row>
                    <TopicDetail
                        topic = { topicDetail }
                        curUserId = { this.props.userInfo.userUsername }
                    />
                </Row>
                <Row>
                </Row>
            </Row>
        )
    }
}

function mapStateToProps( state ){
    return{
        topicDetail: state.content.topicDetail,
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps,null)(TopicDetailContent);