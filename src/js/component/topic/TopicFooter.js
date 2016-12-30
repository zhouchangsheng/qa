/**
 * Created by jerry on 2016/12/16.
 */
import React from 'react';

import { Flex } from "antd-mobile";

import TopicFooterView from './TopicFooterView';
import TopicFooterComment from './TopicFooterComment';
import TopicFooterMore from './TopicFooterMore';


class TopicFooter extends React.Component{
    render(){
        return(
            <Flex className = "topicFooter">
                <Flex.Item>
                    <TopicFooterView views = { this.props.views } />
                </Flex.Item>
                <Flex.Item>
                    <TopicFooterComment
                        comments = { this.props.comments }
                        isCommentClick = { this.props.isCommentClick }
                    />
                </Flex.Item>
                <Flex.Item>
                    <TopicFooterMore
                        collect = { this.props.collect }
                        curUserId = { this.props.curUserId }
                        userId = { this.props.userId }
                        noteId = { this.props.noteId }
                    />
                </Flex.Item>
            </Flex>
        )
    }
}



export default TopicFooter