/**
 * Created by jerry on 2016/12/17.
 */
import React from 'react';

import { Icon } from 'antd-mobile';

class TopicFooterView extends React.Component{
    constructor(){
        super();

        this.state = {
            status: "eye-o",
            views: 0,
        };

        this.switchViewed = this.switchViewed.bind( this );
    }

    switchViewed( status ){

        if( status === "eye-o" ) {

            // 切换为实心
            this.setState({
                status: "eye",
                views: this.state.views + 1
            })
        }
    }


    componentWillMount(){
        let views = parseInt( this.props.views );

        if( views > 0 ){
            this.setState({
                views: views
            })
        }
    }

    render(){
        return(
            <div>
                <Icon type = { this.state.status }  />
                <span className = "topicComments">
                        { this.state.views }
                </span>
            </div>
        )
    }
}

export default TopicFooterView;