/**
 * Created by jerry on 2016/12/15.
 */
import React from 'react';

import Row from '../Row';
import TopicIntro from './TopicIntro';

class TopicIntroList extends React.Component{
    render() {
        let topicList = this.props.topicList;
        let curUserId = this.props.curUserId;

        return (
            <Row>
                {
                    topicList.map(function( topic,index ){
                        return (
                            <TopicIntro
                                key = { topic.noteId }
                                curUserId = { curUserId }
                                topic = { topic }
                            />
                        )
                    })
                }

            </Row>
        )
    }
}


export default TopicIntroList;