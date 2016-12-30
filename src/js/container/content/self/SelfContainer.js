/**
 * Created by jerry on 2016/12/19.
 */
import React from 'react';

import { WhiteSpace } from 'antd-mobile'

import Row from '../../../component/Row';
import SelfIntroNav from '../../../component/SelfIntroNav';
import SelfFuncList from './selfFunc/SelfFuncList';
import SelfLogout from './SelfLogout';

class SelfContainer extends React.Component{
    render(){
        let selfIntro = this.props.selfIntro;
        return(
            <Row>
                <SelfIntroNav
                    thumb = "./images/33.png"
                    title = { selfIntro.userNickname + " @"+ selfIntro.userUsername + ""}
                />
                <WhiteSpace />
                <SelfFuncList

                />
                <WhiteSpace />
                <SelfLogout
                    logoutFunc = { this.props.logoutFunc }
                />
            </Row>
        )
    }
}


export default SelfContainer;