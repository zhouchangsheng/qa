/**
 * Created by jerry on 2016/12/16.
 */
import React from 'react';

import { NavBar } from 'antd-mobile';
import { withRouter } from 'react-router';

class NavBack extends React.Component{
    constructor(){
        super();
        this.handleNavBack = this.handleNavBack.bind(this);
    }

    handleNavBack(){
        this.props.router.go(-1);
    }
    render(){
        return(
            <NavBar
                mode = "light"
                onLeftClick = {this.handleNavBack}
                rightContent = {this.props.navRightContent }

                leftContent = {<span style ={{color:"black"}} >返回</span>}
                style = {{
                    backgroundColor:"white",
                    color:"blue",
                }}
            >
                {
                    this.props.navTitle
                }
            </NavBar>
        )
    }
}

NavBack.propTypes = {
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
};

export default withRouter(NavBack);