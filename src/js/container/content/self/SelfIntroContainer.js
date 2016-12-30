/**
 * Created by jerry on 2016/12/19.
 */
import React from 'react';

import { connect } from 'react-redux';

import NavContentContainer from '../../../component/NavContentContainer';
import NavBack from '../../../component/NavBack';
import SelfIntroForm from './SelfIntroForm';

class SelfIntroContainer extends React.Component{
    render(){
        return(
            <NavContentContainer
                nav = {<NavBack/>}
                title = "个人信息"
            >
                <SelfIntroForm
                    selfIntro = { this.props.selfIntro }
                />
            </NavContentContainer>
        )
    }
}

function mapStateToProps( state ){
    return{
        selfIntro: state.userInfo
    }
}

export default connect(mapStateToProps,null)(SelfIntroContainer);