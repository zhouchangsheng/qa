/**
 * Created by jerry on 2016/12/14.
 */
import React from 'react';

import MainNavBar from '../../component/main/MainNavBar';
import MainNavBarMenu from '../../component/main/MainNavBarMenu';
import NavContentContainer from '../../component/NavContentContainer';

class Main extends React.Component{
    render(){
        return (
            <NavContentContainer
                nav = { <MainNavBar
                            navRightContent = { <MainNavBarMenu rou/>}
                        />
                }
            >
                {
                    this.props.children
                }
            </NavContentContainer>
        )
    }
}


export default Main;

