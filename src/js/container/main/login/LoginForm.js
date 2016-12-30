/**
 * Created by jerry on 2016/12/14.
 */
import React from 'react';

import { InputItem,List,Flex,Button,WhiteSpace,WingBlank,Modal } from 'antd-mobile';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

import Row from '../../../component/Row';

let API = require("../../../middleware/api");

class LoginForm extends React.Component{
    constructor(){
        super();

        this.state = {
            userUsername:"",
            userPassword:"",
            flag:null
        };

        this.handleAccountBlur = this.handleAccountBlur.bind( this );
        this.handleAccountChange = this.handleAccountChange.bind( this );
        this.handlePasswordChange = this.handlePasswordChange.bind( this );
        this.handleLoginCLick = this.handleLoginCLick.bind( this );
    }

    handleAccountBlur(){
        let account = this.state.userUsername.trim();
        let flag = this.state.flag;
        //console.log(userUsername);
        let emailPattern = /@[A-z,0-9]+\.[A-z]+$/g;
        //let illegalCharPattern = /@+|#+|\(+|\)+|&+|\$+|%+|\^|!|`|~/g;

        //验证账号是否为邮箱
        if( emailPattern.test(account) && flag !== "email" ){
            this.setState({
                flag:"email"
            });
        }else if( !emailPattern.test(account) && flag !== "id"){
            this.setState({
                flag:null
            })
        }
    }

    handleAccountChange( userUsername ){
        this.setState({
            userUsername
        })
    }

    handlePasswordChange( userPassword ){
        this.setState({
            userPassword
        })
    }

    handleLoginCLick(){
        let account = this.state.userUsername.trim();
        let password = this.state.userPassword;

        let tipText = account==""?"账号 ":"";
        tipText += password == ""?"密码 ":"";
        tipText += "不能为空";

        if( account == ""||password == "" ){
            Modal.alert(
                "提示",
                tipText,
                [
                    {
                        text:"知道了",
                    }
                ]
            );
            return;
        }


        let validateOldUserFunc = this.props.validateOldUserFunc;
        let pushFunc = this.props.router.push;

        validateOldUserFunc?validateOldUserFunc( this.state,function(){
           pushFunc("content");
        }):"";
    }



    render(){
        return(
            <DocumentTitle title="老用户登录">
                <Row>
                    <List>
                        <InputItem
                            placeholder="请输入用户名/邮箱"
                            onBlur = { this.handleAccountBlur }
                            onChange = { this.handleAccountChange }
                            value = { this.state.userUsername }
                        >账号</InputItem>
                        <InputItem
                            placeholder="请输入密码"
                            type="password"
                            onChange = { this.handlePasswordChange }
                            value = { this.state.userPassword }
                        >密码</InputItem>
                    </List>
                    <WhiteSpace size="md"/>
                    <WingBlank size="lg">
                        <Button type="primary" onClick = { this.handleLoginCLick }>登录</Button>
                    </WingBlank>
                </Row>
            </DocumentTitle>
        )
    }
}

LoginForm.propTypes = {
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
};

function mapDispatchToProps( dispatch ){
    return{
        validateOldUserFunc: bindActionCreators( API.validateOldUser,dispatch)
    }
}


export default  withRouter(connect(null,mapDispatchToProps)(LoginForm));