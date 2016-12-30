/**
 * Created by jerry on 2016/12/19.
 */
import React from 'react';

import { withRouter } from 'react-router';

import Row from './Row';

class SelfIntroNav extends React.Component{
    constructor(){
        super();
        this.handleSelfIntroClick = this.handleSelfIntroClick.bind( this );

    }
    handleSelfIntroClick(){
        this.props.router.push('content/selfIntro')
    }
    render(){
        let url = "url("+this.props.thumb+")";
        return(
            <Row
                styleCss = {{
                    backgroundColor: "white",
                    padding: "15px",
                    position:"relative",
                    borderBottom: "1px solid #ebebeb"
                }}
                onClick = { this.handleSelfIntroClick }
            >
                <Row
                    styleCss = {{
                        display:"inline-block",
                        height:"80px",
                        width:"80px",
                        backgroundImage: url,
                        borderRadius:"50%",
                        backgroundPosition:"center",
                        backgroundSize:"cover",
                        lineHeight:"80px"
                    }}
                >
                </Row>
                <Row styleCss={{
                    left: "120px",
                    top: "40px",
                    position:"absolute",
                    fontSize:"36px"
                }}>
                    { this.props.title }
                </Row>

            </Row>
        )
    }
}

SelfIntroNav.propTypes = {
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
};

export default withRouter(SelfIntroNav);