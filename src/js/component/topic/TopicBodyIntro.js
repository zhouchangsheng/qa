/**
 * Created by jerry on 2016/12/16.
 */
import React from 'react';

import Row from '../Row';
import ImagesList from '../ImagesList';

class TopicBody extends React.Component{
    constructor(){
        super();
        this.handleLookMoreClick = this.handleLookMoreClick.bind( this );
    }
    handleLookMoreClick(){
        let  isLookMoreClick = this.props.isLookMoreClick;
        if(isLookMoreClick){
            isLookMoreClick({
                type: "lookMore"
            });
        }
    }
    render(){
        return(
            <Row>
                <Row
                    className = "topicText topicTextAbbr"
                >
                    {
                        this.props.topicContent
                    }
                </Row>
                <Row className = "topicDetailTrigger">
                    <span onClick = { this.handleLookMoreClick } >查看更多</span>
                </Row>
                <Row
                    className = "topicContainer"
                >
                    <ImagesList
                        imagesURLArr = { this.props.topicImagesURLArr }
                    />
                </Row>
            </Row>
        )
    }
}

export default TopicBody;