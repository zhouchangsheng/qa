/**
 * Created by jerry on 2016/12/16.
 */
import React from 'react';

import { List,InputItem,Button,WhiteSpace,WingBlank,Modal } from 'antd-mobile';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavContentContainer from '../../../component/NavContentContainer';
import NavBack from '../../../component/NavBack';

let API = require("../../../middleware/api");

class RegisterForm extends React.Component{
    constructor(){
        super();

        this.state = {
            username: '',
            userNickname: '',
            password: '',
            passwordAgain: '',
            userEmail: '',

            passwordError:false,
            emailError:false,
            usernameError:false,

            emailErrorType:"emailFormat"
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleUserNicknameChange = this.handleUserNicknameChange.bind(this);
        this.handlePasswordAgainChange = this.handlePasswordAgainChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);

        this.handleUsernameBlur = this.handleUsernameBlur.bind(this);
        this.handleEmailBlur = this.handleEmailBlur.bind(this);
        this.handlePasswordBlur = this.handlePasswordBlur.bind(this);

        this.emailVerify = this.emailVerify.bind(this);
        this.emailValidate = this.emailValidate.bind(this);
        this.passwordValidate = this.passwordValidate.bind(this);
        this.usernameValidate = this.usernameValidate.bind(this);

        this.handleSubmitClick = this.handleSubmitClick.bind( this );
    }

    handleUsernameChange( username ){
        username = username.trim();

        this.setState({
            username
        },function(){
            let username = this.state.username;
            if( username === "" ){
                this.setState({
                    usernameError:false
                })
            }
        }.bind(this))
    }

    handleUsernameBlur(  ){
        let username = this.state.username;
        let usernameError = this.state.usernameError;

        this.usernameValidate( username,usernameError );
    }

    usernameValidate(username, usernameError ){
        if( username !== "" ){
            (function(){
                API.validateBasicInfo({
                    userUsername:"" + username
                },function(response){
                    let errorCode = parseInt(response.errorCode);
                    let success = eval( response.data );
                    if( errorCode === 0 && success && usernameError ){
                        this.setState({
                            usernameError:false
                        });
                    }else if( errorCode ===0 && !success && !usernameError){
                        this.setState({
                            usernameError:true
                        });
                    }
                }.bind(this))
            }.bind(this))();
        }
    }

    handleUserNicknameChange( userNickname ){
        this.setState({
            userNickname
        })
    }

    handlePasswordChange( password ){
        this.setState({
            password
        },function(){
            let password = this.state.password;
            let passwordAgain = this.state.passwordAgain;
            let passwordError = this.state.passwordError;

            this.passwordValidate( password,passwordAgain,passwordError );
        })
    }

    handlePasswordAgainChange( passwordAgain ){
        this.setState({
            passwordAgain
        },function(){
            let password = this.state.password;
            let passwordAgain = this.state.passwordAgain;
            let passwordError = this.state.passwordError;

            this.passwordValidate( password,passwordAgain,passwordError );
        })
    }

    handleEmailChange( userEmail ){
        this.setState({
            userEmail,

        },function(){
            let email = this.state.userEmail;
            let emailError = this.state.emailError;

            this.emailVerify( email,emailError );
        });



    }

    handleEmailBlur(){
        let email = this.state.userEmail;
        let emailError = this.state.emailError;

        this.emailVerify( email,emailError,true );
    }

    emailValidate( email ){

        (function(){
            API.validateBasicInfo({
                userEmail:"" + email
            },function(response){
                let errorCode = parseInt(response.errorCode);
                let success = eval( response.data );

                if( errorCode ===0 && !success){
                    this.setState({
                        emailError:true,
                        emailErrorType:"emailVerify"
                    });
                }
            }.bind(this))
        }.bind(this))();
    }

    handlePasswordBlur(){
        let password = this.state.password;
        let passwordAgain = this.state.passwordAgain;
        let passwordError = this.state.passwordError;

        this.passwordValidate( password,passwordAgain,passwordError );
    }

    emailVerify(email, emailError,blur ){
        let emailPattern = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/g;
        let emailValidated = emailPattern.test( email );

        if( email !== "" ){
            if( emailValidated ){ //合法邮箱
                if( blur ){
                    this.emailValidate( email );
                }else if( emailError ){
                    this.setState({
                        emailError:false
                    })
                }
            }else if( !emailValidated && !emailError ){ //非法邮箱
                this.setState({
                    emailErrorType:"emailFormat",
                    emailError:true,
                })
            }
        }else if( email === "" && emailError ){
            this.setState({
                emailError:false,
            })
        }


    }

    passwordValidate( password,passwordAgain,passwordError ){
        let pwdEqual = password === passwordAgain;

        if( pwdEqual && password === "" && passwordError ){
            this.setState({
                passwordError:false
            })
        }else if( pwdEqual && password !== "" && passwordError ){
            this.setState({
                passwordError:false
            })
        }else if( !pwdEqual && !passwordError ){
            this.setState({
                passwordError:true
            })
        }

    }

    alertError( type,tipText ){
        let alertContent = "未知錯誤";
        switch( type ){
            case "emailFormat":
                alertContent = "此邮箱格式不合法";
                break;

            case "emailVerify":
                alertContent = "此邮箱已注册";
                break;

            case "password":
                alertContent = "兩次輸入密碼不一致";
                break;

            case "username":
                alertContent = "该用户名已存在";
                break;

            case "error":
                alertContent = "请先处理错误";
                break;

            case "alert":
                alertContent = tipText;
        }

        Modal.alert(
            "输入提示",
            alertContent,
            [
                {
                    text:"确定"
                }
            ]
        )
    }

    handleSubmitClick(){
        let passwordError = this.state.passwordError;
        let emailError = this.state.emailError;
        let usernameError = this.state.usernameError;

        let error = passwordError || emailError || usernameError;

        if( error ){
            this.alertError("error");
            return;
        }

        let username = this.state.username;
        let userNickname = this.state.userNickname;
        let password = this.state.password;
        let userEmail = this.state.userEmail;

        let errorTipText = username==""?"用户名 ":"";
        errorTipText += userNickname==""?"昵称 ":"";
        errorTipText += password==""?"密码 ":"";
        errorTipText += userEmail==""?"邮箱 ":"";

        if( username==""||userNickname==""||password==""||userEmail==""){
            this.alertError( "alert",errorTipText );
            return;
        }

        let userInfo = this.props.userInfo;
        let addNewUserFunc = this.props.addNewUserFunc;

        userInfo.userUsername = username;
        userInfo.userNickname = userNickname;
        userInfo.userPassword = password;
        userInfo.userEmail = userEmail;

        addNewUserFunc?addNewUserFunc(userInfo,function(){
            this.props.router.push("content");
        }.bind( this )):"";

    }

    render(){
        return(
            <NavContentContainer
                title = "用户注册"
                nav = { <NavBack /> }
            >
                <List>
                    <InputItem
                        type = "text"
                        placeholder = "请输入用户名"
                        value = { this.state.username }
                        onChange = { this.handleUsernameChange }
                        onBlur = { this.handleUsernameBlur }
                        clear
                        error = { this.state.usernameError }
                        onErrorClick = { this.alertError.bind(this,'username') }
                        extra = "必填"
                    >
                        用户名
                    </InputItem>
                    <InputItem
                        type = "text"
                        placeholder = "请输入昵称"
                        value = { this.state.userNickname }
                        onChange = { this.handleUserNicknameChange }
                        clear
                        extra = "必填"
                    >
                        昵称
                    </InputItem>
                    <InputItem
                        type = "password"
                        placeholder = "请输入密码"
                        value = { this.state.password }
                        onChange = { this.handlePasswordChange }
                        clear
                        extra = "必填"
                        error = { this.state.passwordError }
                        onBlur = { this.handlePasswordBlur }
                        onErrorClick = { this.alertError.bind(this,'password') }
                    >
                        密码
                    </InputItem>
                    <InputItem
                        type = "password"
                        placeholder = "请再次密码"
                        value = { this.state.passwordAgain }
                        onChange = { this.handlePasswordAgainChange }
                        clear
                        extra = "必填"
                        error = { this.state.passwordError }
                        onBlur = { this.handlePasswordBlur }
                        onErrorClick = { this.alertError.bind(this,'password') }
                    >
                        确认密码
                    </InputItem>
                    <InputItem
                        placeholder = "请输入邮箱"
                        value = { this.state.userEmail }
                        onChange = { this.handleEmailChange }
                        clear
                        error = { this.state.emailError }
                        onErrorClick = { this.alertError.bind(this,this.state.emailErrorType ) }
                        onBlur = { this.handleEmailBlur }
                        extra = "必填"
                    >
                        邮箱
                    </InputItem>
                </List>
                <WhiteSpace size = "lg" />
                <WingBlank size = "lg" >
                    <Button type = "primary" onClick = { this.handleSubmitClick }>提交</Button>
                </WingBlank>
            </NavContentContainer>
        )
    }
}

function mapStateToProps( state ){
    return{
        userInfo: state.userInfo
    }
}

function mapDispatchToProps( dispatch ){
    return{
        addNewUserFunc: bindActionCreators(API.addNewUser,dispatch)
    }
}

export default connect( mapStateToProps,mapDispatchToProps )( withRouter( RegisterForm ) );