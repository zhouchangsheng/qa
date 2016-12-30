/**
 * Created by jerry on 2016/12/18.
 */
import React from 'react';

import { Button,Flex,NavBar } from 'antd-mobile';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Row from '../../../../component/Row';

let API = require("../../../../middleware/api");

class TopicHeader extends React.Component{
    constructor(){
        super();

        this.state = {
            latestLoading: false,
            formerLoading: false,
            disabled: false
        };

        this.handleQuestioningClick = this.handleQuestioningClick.bind( this );
        this.handleUpdateFormerTopicClick = this.handleUpdateFormerTopicClick.bind(this);
        this.handleUpdateLatestTopicClick = this.handleUpdateLatestTopicClick.bind(this);
        this.updateFormerTopic = this.updateFormerTopic.bind( this );
        this.updateLatestTopic = this.updateLatestTopic.bind( this );
    }

    handleQuestioningClick(){
        this.props.router.push('content/questioning');
    }

    updateFormerTopic(){
        let updateFormerTopicFunc = this.props.updateFormerTopicFunc;
        let beforeTopicCreateTime = this.props.beforeTopicCreateTime;

        updateFormerTopicFunc?updateFormerTopicFunc({
            userId: this.props.curUserId,
            beforeCreateTime: beforeTopicCreateTime
        },function(){
            this.setState({
                formerLoading: false,
                disabled: false
            })
        }.bind(this)):"";
    }

    updateLatestTopic(){
        let updateLatestTopicFunc = this.props.updateLatestTopicFunc;
        let afterTopicCreateTime = this.props.afterTopicCreateTime;

        updateLatestTopicFunc?updateLatestTopicFunc({
            userId: this.props.curUserId,
            afterCreateTime: afterTopicCreateTime
        },function(){
            this.setState({
                latestLoading: false,
                disabled: false
            })
        }.bind(this)):"";
    }

    handleUpdateFormerTopicClick(){
        this.setState({
            formerLoading: true,
            disabled: true
        });

        this.updateFormerTopic();
    }

    handleUpdateLatestTopicClick(){
        this.setState({
            latestLoading: true,
            disabled: true
        });

        this.updateLatestTopic();
    }

    render(){
        return(
            <Row>
                <NavBar
                    onLeftClick = { this.handleQuestioningClick }
                    iconName = "edit"
                    leftContent = {<span style ={{color:"black"}} >提问</span>}
                    style = {{
                        backgroundColor:"white",
                        color:"black",
                    }}
                >
                    <Flex >
                        <Button
                            inline
                            style={{ marginRight: '1rem'}}
                            loading = { this.state.latestLoading }
                            disabled = { this.state.disabled }
                            onClick = { this.handleUpdateLatestTopicClick }
                            size = "small"
                        >
                            上刷新
                        </Button>
                        <Button
                            inline
                            size="small"
                            loading = { this.state.formerLoading }
                            disabled = { this.state.disabled }
                            onClick = { this.handleUpdateFormerTopicClick }
                        >
                            下刷新
                        </Button>
                    </Flex>
                </NavBar>
            </Row>
        )
    }
}

TopicHeader.propTypes = {
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
};

function mapStateToProps( state ){
    let listLength = state.content.topicList.length;
    let lastTopic = state.content.topicList[ listLength-1 ];
    let firstTopic = state.content.topicList[ 0 ];
    return{
        afterTopicCreateTime: firstTopic ? firstTopic.noteCreateTime : null,
        beforeTopicCreateTime: lastTopic ? lastTopic.noteCreateTime : null,
        curUserId: state.userInfo.userId
    }
}


function mapDispatchToProps( dispatch ){
    return{
        updateFormerTopicFunc: bindActionCreators(API.updateFormerTopic,dispatch),
        updateLatestTopicFunc: bindActionCreators(API.updateLatestTopic,dispatch)
    }
}

export default connect( mapStateToProps,mapDispatchToProps )( withRouter( TopicHeader ) );