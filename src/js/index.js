/**
 * Created by jerry on 2016/12/14.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import Router from './router/Router';
import configureStore from './store/configureStore';

const store = configureStore();

const render = ()=>ReactDOM.render(
    <Provider store = { store } >
        <Router/>
    </Provider>,
    document.getElementById("app")
);

render();
store.subscribe(render);