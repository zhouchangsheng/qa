/**
 * Created by jerry on 2016/12/15.
 */
import React from 'react';

import Row from '../component/Row';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class App extends React.Component{
    componentWillMount(){
        let username = this.props.username;

        if( username == 0 ){

        }else if( username === undefined || username === null ){
            this.props.router.push("main");
        }else{
            this.props.router.push("content");
        }
    }

    render(){
        return(
            <Row>
                {
                    this.props.children
                }
            </Row>
        )
    }
}

App.propTypes = {
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
};

function mapStateToProps( state ){
    return {
        username: state.userInfo.userUsername
    }
}

export default connect( mapStateToProps,null )( withRouter(App) );