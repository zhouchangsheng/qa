/**
 * Created by jerry on 2016/12/15.
 */
import React from 'react';
import DocumentTitle from 'react-document-title';

import { Card,Flex } from 'antd-mobile';

import Row from '../Row';
import TopicHeader from './TopicHeader';
import TopicFooter from './TopicFooter';
import TopicBodyDetail from './TopicBodyDetail';

class TopicDetail extends React.Component{
    render(){
        let topic = this.props.topic;
        return(
            <DocumentTitle
                title = { "题目-" + topic.noteTitle }
            >
                <Row>
                    <Card full>
                        <Card.Header
                            title = {
                                <TopicHeader
                                    topicTitle = { topic.noteTitle }
                                    userNickname = { topic.userNickname }
                                />
                            }
                            thumb = { topic.userAvatarURL|| "./images/33.png" }
                            thumbStyle = {{ borderRadius:"50%",height:"80px",width:"80px" }}
                            extra = { this.props.extra }
                        />
                        <Card.Body>
                            <TopicBodyDetail
                                topicContent = { topic.noteContent }
                                topicImagesURLArr = { topic.noteImages }
                            />
                        </Card.Body>
                        <Card.Footer
                            content = {
                                <TopicFooter
                                    views = { topic.noteViewNum }
                                    comments = { topic.noteCommentNum }
                                    collect = { topic.noteStatus }
                                    curUserId = { this.props.curUserId }
                                    userId = { topic.userId }

                                />
                            }
                        />
                    </Card>
                </Row>
            </DocumentTitle>
        )
    }
}

export default TopicDetail;