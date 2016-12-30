/**
 * Created by jerry on 2016/12/15.
 */
import React from 'react';

import { withRouter } from 'react-router';
import { Popover,Icon,Modal } from 'antd-mobile';
import Row from '../Row';

let Item = Popover.Item;
let menu =[
    (<Item key="1" iconName="aliwangwang" value="signUp">老用户登录</Item>),
    (<Item key="2" iconName="aliwangwang-o"  value="signIn">新用户登录</Item>)
];

class MainNavBarMenu extends React.Component{
    constructor(){
        super();
        this.state = {
            visible : false,
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
    }

    handleSelect(opt){
        this.setState({
            visible: false ,
        });

        this.enterLoginPage(opt.props.value);
    }

    enterLoginPage(key){
        let path = "";
        let currentLocation = location.hash.replace(/^#\//g,"");

        if( key === "signUp" && currentLocation !== "main/login" ){
            path = "main/login";
            this.props.router.push(path);
        }else if( key === "signIn" && currentLocation !== "main/loginForNewUser" ){
            path = "main/loginForNewUser";
            this.props.router.push(path);
        }
    }


    handleVisibleChange(visible){
        this.setState({
            visible,
        });
    }

    render(){
        return(
            <Row>
                <Popover
                    visible = { this.state.visible }
                    overlay = { menu }
                    popupAlign ={{
                        overflow:{ adjustY: 0 ,adjustX: 0 },
                        offset:[ 10 , 25 ]
                    }}
                    onSelect = { this.handleSelect }
                    onVisibleChange = { this.handleVisibleChange }
                >
                    <Icon type = "bars" />
                </Popover>
            </Row>
        )
    }
}

MainNavBarMenu.propTypes = {
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
};

export default withRouter(MainNavBarMenu);

