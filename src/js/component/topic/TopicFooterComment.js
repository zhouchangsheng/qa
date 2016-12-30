/**
 * Created by jerry on 2016/12/17.
 */
import React from 'react';

import { Icon } from 'antd-mobile';

class TopicFooterComment extends React.Component{
    constructor(){
        super();

        this.state = {
            comments: 0
        };

        this.handleCommentClick = this.handleCommentClick.bind( this );
    }

    handleCommentClick(){
        let isCommentClick = this.props.isCommentClick;
        if( isCommentClick ){
            isCommentClick({
                type: "comment"
            })
        }
    }

    componentWillMount(){
        let comments = parseInt( this.props.comments );

        if( comments > 0 ){
            this.setState({
                comments: comments
            })
        }
    }

    render(){
        return(
            <div>
                <Icon type = "message" onClick = { this.handleCommentClick } />
                <span className = "topicComments" >
                        { this.state.comments }
                </span>
            </div>
        )
    }
}

export default TopicFooterComment;