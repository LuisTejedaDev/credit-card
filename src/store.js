import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import {appSlice, cardSlice} from './slices';
import thunk from 'redux-thunk'

export const store = configureStore({
    reducer: {
        navApp: appSlice,
        navCard: cardSlice,
    }
}, applyMiddleware(thunk))