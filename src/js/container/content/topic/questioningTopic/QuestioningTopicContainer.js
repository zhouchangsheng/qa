/**
 * Created by jerry on 2016/12/18.
 */
import React from 'react';

import NavContentContainer from '../../../../component/NavContentContainer';
import NavBack from '../../../../component/NavBack';
import QuestioningForm from './QuestioningForm';

class QuestioningTopicContainer extends React.Component{
    render(){
        return(
            <NavContentContainer
                nav = { <NavBack /> }
            >
                <QuestioningForm />

            </NavContentContainer>
        )
    }
}

export default QuestioningTopicContainer;