/**
 * Created by jerry on 2016/12/15.
 */
import React from 'react';

import { Result } from 'antd-mobile';

import MainNavBar from '../component/main/MainNavBar';
import NavContentContainer from '../component/NavContentContainer';

class NotFound extends React.Component{
    render(){
        return(
            <NavContentContainer
                title = "404"
                nav = { <MainNavBar />}
            >
                <Result
                    imageUrl=""
                    title = "404"
                    message = "未找到您访问的地址"
                />
            </NavContentContainer>
        )
    }
}

export default NotFound;