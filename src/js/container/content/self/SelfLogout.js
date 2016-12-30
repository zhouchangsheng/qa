/**
 * Created by jerry on 2016/12/19.
 */
import React from 'react';

import { WingBlank,Button,Modal } from 'antd-mobile';
import { withRouter } from 'react-router';

import Row from '../../../component/Row';


class SelfLogout extends React.Component{
    constructor(){
        super();
        this.handleLogoutClick = this.handleLogoutClick.bind( this );
        this.logout = this.logout.bind( this );
    }

    logout(){
        let logoutFunc = this.props.logoutFunc;
        let pushFunc = this.props.router.push;
        logoutFunc?logoutFunc(function(){
            pushFunc("main");
        }):"";
    }

    handleLogoutClick(){
        Modal.alert(
            "退出",
            "确定退出?",
            [
                {
                    text:"取消",
                },{
                    text:"确定",
                    onPress: this.logout
                }
            ]
        );
    }

    render(){
        return(
            <Row>
                <WingBlank size = "sm">
                    <Button type="primary" onClick = { this.handleLogoutClick } >退出</Button>
                </WingBlank>
            </Row>
        )
    }
}

SelfLogout.propTypes = {
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
};

export default withRouter ( SelfLogout );