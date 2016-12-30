/**
 * Created by jerry on 2016/12/14.
 */
import React from 'react';

import { List,InputItem,WingBlank,WhiteSpace,Button,Picker,Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import DocumentTitle from 'react-document-title';

import Row from '../../../component/Row';

let schoolConfig = require("../../../middleware/school.config");
let school = schoolConfig.school;
let API = require("../../../middleware/api");

class LoginFormForNewUser extends React.Component{
    constructor(){
        super();
        this.state = {
            userUsername:"",
            userPassword:"",
            school: null
        };

        this.handleSchoolChange = this.handleSchoolChange.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLoginCLick = this.handleLoginCLick.bind(this);
    }

    handleSchoolChange ( arr ) {
        this.setState({
            school: arr
        });
    }

    schoolFormat( arr ){
        return arr[1];
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
        let schoolObj = this.state.school;
        let account = this.state.userUsername.trim();
        let password = this.state.userPassword;
        let userSchool = schoolObj ? schoolObj[1] : "";



        let tipText = userSchool==""?"学校 ":"";
        tipText += account==""?"账号 ":"";
        tipText += password == ""?"密码 ":"";
        tipText += "不能为空";

        if( account == ""|| password == ""||userSchool =="" ){
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

        let dataObj = {
            userUsername: account,
            userPassword: password,
            userSchool: userSchool
        };

        let validateNewUserFunc = this.props.validateNewUserFunc;
        let pushFunc = this.props.router.push;

        validateNewUserFunc ? validateNewUserFunc( dataObj,function(){
            pushFunc("main/register");
        } ):"";


    }

    render(){
        return(
            <DocumentTitle title="新用户登录">
                <Row>
                    <List>
                        <Picker
                            data = { school }
                            title = "选择学校"
                            extra = "请选择"
                            cols = { 2 }
                            value = { this.state.school }
                            onChange = { this.handleSchoolChange }
                            format = { this.schoolFormat}
                        >
                            <List.Item arrow = "horizontal">学校</List.Item>
                        </Picker>
                        <InputItem
                            placeholder="请输入学号(教务系统)"
                            onChange = { this.handleAccountChange }
                            value = { this.state.userUsername }
                        >账号</InputItem>
                        <InputItem
                            placeholder="请输入密码(教务系统)"
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

LoginFormForNewUser.propTypes = {
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
};

function mapDispatchToProps( dispatch ){
    return{
        validateNewUserFunc:bindActionCreators(API.validateNewUser,dispatch)
    }
}
export default  connect(null,mapDispatchToProps)(withRouter( LoginFormForNewUser ));