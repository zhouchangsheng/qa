/**
 * Created by jerry on 2016/12/15.
 */
import React from 'react';

import { Card,WhiteSpace } from 'antd-mobile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Row from '../Row';
import TopicHeader from './TopicHeader';
import TopicFooter from './TopicFooter';
import TopicBodyIntro from './TopicBodyIntro';

let dispatcher = require('../../middleware/dispatcher');

class TopicIntro extends React.Component{
    constructor(){
        super();

        this.isLookMoreOrCommentClick = this.isLookMoreOrCommentClick.bind( this );
    }

    isLookMoreOrCommentClick( obj ){
        let transferTopicDetailFunc = this.props.transferTopicDetailFunc;

        if( transferTopicDetailFunc ){
            transferTopicDetailFunc( this.props.topic );
            this.props.router.push('content/topicDetail')
        }
    }

    render(){
        let topic = this.props.topic;

        return(
            <Row>
                <WhiteSpace size="sm" />
                <Card full>
                    <Card.Header
                        title = {
                            <TopicHeader
                                topicTitle = { topic.noteTitle }
                                userNickname = { topic.userNickname }
                            />
                        }
                        thumb = { topic.userAvatarURL|| "./images/33.png" }
                        thumbStyle = {{ borderRadius:"50%",height:"4rem",width:"4rem" }}
                        extra = { this.props.extra }
                    />
                    <Card.Body>
                        <TopicBodyIntro
                            topicContent = { topic.noteContent }
                            topicImagesURLArr = { topic.noteImages }
                            isLookMoreClick = { this.isLookMoreOrCommentClick }
                        />
                    </Card.Body>
                    <Card.Footer
                        content = {
                            <TopicFooter
                                views = { topic.noteViewNum }
                                noteId = { topic.noteId }
                                comments = { topic.noteCommentNum }
                                collect = { topic.noteStatus }
                                curUserId = { this.props.curUserId }
                                userId = { topic.userId }
                                isCommentClick = { this.isLookMoreOrCommentClick }
                            />
                        }
                    />
                </Card>
            </Row>
        )
    }
}

TopicIntro.propTypes = {
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
};

function mapDispatchToProps( dispatch ){
    return{
        transferTopicDetailFunc: bindActionCreators( dispatcher.updateTopicDetail2Store,dispatch)
    }
}

export default connect( null,mapDispatchToProps )( withRouter( TopicIntro ) );