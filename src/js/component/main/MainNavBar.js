/**
 * Created by jerry on 2016/12/15.
 */
import React from 'react';

import { withRouter } from 'react-router';
import { NavBar,Icon } from 'antd-mobile';

class MainNavBar extends React.Component{
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.router.push("/");
    }

    render(){
        return(
            <NavBar
                iconName = "github"
                onLeftClick = { this.handleClick }
                style = {{ backgroundColor: "white", color: "blue" }}
                rightContent = { this.props.navRightContent }
            >
                {
                    this.props.children
                }
            </NavBar>
        )
    }
}

MainNavBar.propTypes = {
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
};

export default withRouter(MainNavBar);