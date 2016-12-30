/**
 * Created by jerry on 2016/12/16.
 */
import React from 'react';

import Row from '../Row';
import ImagesList from '../ImagesList';

class TopicBodyDetail extends React.Component{
    render(){
        return(
            <Row>
                <Row
                    className = "topicText"
                >
                    {
                        this.props.topicContent
                    }
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

export default TopicBodyDetail;