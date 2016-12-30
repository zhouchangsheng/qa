/**
 * Created by jerry on 2016/12/15.
 */
import React from 'react';
import DocumentTitle from 'react-document-title';

import { TabBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TopicIntroContainer from './topic/topicIntro/TopicIntroContainer';
import SelfContainer from './self/SelfContainer';

//let API = require("../../middleware/api");
let dispatcher = require("../../middleware/dispatcher");

class TabBarContent extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedTab: "column"
        };

        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(value){
        this.setState({
            selectedTab:value
        })
    }

    componentDidMount(){
        let getTopicFunc = this.props.getTopicFunc;
        let selfIntro = this.props.selfIntro;
        getTopicFunc?getTopicFunc(selfIntro):"";
    }

    render(){
        return(
            <DocumentTitle
                title = "QA问答社区"
            >
                <TabBar
                    unselectedTintColor = "#949494"
                    tintColor = "#33A3F4"
                    barTintColor = "white"
                >
                    <TabBar.Item
                        title = "吧栏"
                        key = "column"
                        icon = {{ uri: './images/column.png' }}
                        selectedIcon = {{ uri: './images/column_active.png' }}
                        onPress = { ()=>this.handleTabClick("column") }
                        selected = { this.state.selectedTab === "column"}
                    >
                        <TopicIntroContainer
                            topicList = { this.props.topicList }
                            curUserId = { this.props.selfIntro.userId }
                        />
                    </TabBar.Item>
                    <TabBar.Item
                        title = "我"
                        key = "self"
                        icon = {{ uri: './images/self.png' }}
                        selectedIcon = {{ uri: './images/self_active.png'}}
                        onPress = { ()=>this.handleTabClick("self") }
                        selected = { this.state.selectedTab ==="self" }
                    >
                        <SelfContainer
                            logoutFunc = { this.props.logoutFunc }
                            selfIntro = { this.props.selfIntro }
                        />
                    </TabBar.Item>
                </TabBar>
            </DocumentTitle>
        )
    }
}

function mapStateToProps( state ){
    return{
        selfIntro: state.userInfo,
        topicList: state.content.topicList,
    }
}

function mapDispatchToProps( dispatch ){
    return{
        //getTopicFunc:bindActionCreators(API.getTopic,dispatch),
        logoutFunc:bindActionCreators( dispatcher.logoutAndClearState,dispatch )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TabBarContent);