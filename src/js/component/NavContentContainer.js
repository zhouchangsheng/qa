/**
 * Created by jerry on 2016/12/16.
 */
import React from 'react';
import DocumentTitle from 'react-document-title';

import { WhiteSpace } from 'antd-mobile';

import Row from './Row';

class NavContentContainer extends React.Component{
    render(){
        return(
            <DocumentTitle title = { this.props.title || "" }>
                <Row>
                    <Row styleCss = {{
                        position: "fixed",
                        width: "100%",
                        zIndex: 1,
                        borderBottom: "1px solid #eaeaea"
                    }}>
                        {
                            this.props.nav
                        }
                    </Row>
                    <Row styleCss={{ paddingTop:"85px" }}>
                        <WhiteSpace size="sm"/>
                        {
                            this.props.children
                        }
                    </Row>
                </Row>
            </DocumentTitle>
        )
    }
}

export default NavContentContainer;