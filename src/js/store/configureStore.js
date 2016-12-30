/**
 * Created by jerry on 2016/12/16.
 */
import { createStore,applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';

import Reducer from '../reducer/index';

export default function configureStore( preloadedState ){
    return createStore(
        Reducer,
        preloadedState,
        applyMiddleware( thunkMiddleWare )
    )
}