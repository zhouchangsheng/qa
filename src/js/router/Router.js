/**
 * Created by jerry on 2016/12/15.
 */
import React from 'react';
import { Router,IndexRoute,IndexRedirect,Route,hashHistory } from 'react-router';

/**
 *
 * */
import App from './App';

/**
 * @alias 首页
 * */
import Main from '../container/main/Main';
import MainPage from '../container/main/MainPage';
import Login from '../container/main/login/LoginForm';
import LoginForNewUser from '../container/main/login/LoginFormForNewUser';

import NotFound from '../container/NotFound';

import TabBarContent from '../container/content/TabBarContent';
import TopicDetail from '../container/content/topic/topicDetail/TopicDetailContainer';
import QuestioningTopic from '../container/content/topic/questioningTopic/QuestioningTopicContainer';

import SelfIntro from '../container/content/self/SelfIntroContainer';
import SelfCollectIntro from '../container/content/self/selfFunc/SelfFuncCollect';

import RegisterForm from './../container/main/login/RegisterForm';

const routes = (
    <Route path = "/" compnent = { App }>
        <IndexRedirect to = "/main" />
        <Route path = "main" component = { Main }>
            <IndexRoute component={ MainPage }/>
            <Route path = "login" component = { Login }/>
            <Route path = "loginForNewUser" component = { LoginForNewUser } />
            <Route path = "register" component={ RegisterForm } />
        </Route>

        <Route path = "content" component = { App }>
            <IndexRedirect to = "tabBar" />
            <Route path = "tabBar" component = { TabBarContent }/>
            <Route path = "topicDetail" component = { TopicDetail } />
            <Route path = "questioning" component = { QuestioningTopic } />

            <Route path = "selfIntro" component={ SelfIntro } />
            <Route path = "selfCollectIntro" component={ SelfCollectIntro } />
        </Route>
        <Route path="*" component = { NotFound }/>
    </Route>
);



class RouterContainer extends React.Component{
    render(){
        return(
            <Router history = { hashHistory }>
                {
                    routes
                }
            </Router>
        )
    }
}

export default RouterContainer;
