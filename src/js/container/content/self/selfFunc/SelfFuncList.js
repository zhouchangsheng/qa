/**
 * Created by jerry on 2016/12/19.
 */
import React from 'react';

import { List,Icon } from 'antd-mobile';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

let API = require("../../../../middleware/api");

class SelfFuncList extends React.Component{
    constructor(){
        super();

        this.handleCollectClick = this.handleCollectClick.bind( this );
    }

    handleCollectClick(){
        let getCollectTopicFunc = this.props.getCollectTopicFunc;
        let userId = this.props.curUserId;

        getCollectTopicFunc?getCollectTopicFunc(userId,function(){
            this.props.router.push('content/selfCollectIntro');
        }.bind(this)):"";

    }

    judgeType( type ){
        switch ( type ){
            case "collect":
                this.handleCollectClick();
                break;
        }
    }

    handleFuncListClick( type ){
        this.judgeType( type );
    }


    render(){
        return(
            <List >
                <List.Item
                    thumb = { <Icon type = "heart" />}
                    arrow = "horizontal"
                    onClick = { this.handleFuncListClick.bind(this,"collect") }
                >
                    <span >我的收藏</span>
                </List.Item>
            </List>
        )
    }
}

SelfFuncList.propTypes = {
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
};

function mapStateToProps( state ){
    return{
        curUserId: state.userInfo.userId
    }
}

function mapDispatchToProps( dispatch ){
    return{
        getCollectTopicFunc:bindActionCreators( API.getCollectTopic,dispatch )
    }
}

export default connect( mapStateToProps,mapDispatchToProps )( withRouter( SelfFuncList ) );