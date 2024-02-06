import {createSlice} from '@reduxjs/toolkit'
import Orientation from 'react-native-orientation'

/* 
    Este slice es generico para variables de la misma aplicación, puede contener cosas como:

    orientation,
    keyboard
    wifi,
    language,
    etc...

    Cosas que manejan la misma aplicación como tal
*/

const initialState = {
    orientation: Orientation.getInitialOrientation(),
    keyboard: false,
    hasConnection: true,
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrientation: (state, action) => {state.orientation = action.payload},
        setKeyboard: (state, action) => {state.keyboard = action.payload},
        setHasConnection: (state, action) => {state.hasConnection = action.payload},
    }
})

export const {setOrientation, setKeyboard, setHasConnection} = navSlice.actions

export const selectOrientation = (state) => state.navApp.orientation;
export const selectKeyboard = (state) => state.navApp.keyboard;
export const selectHasConnection = (state) => state.navApp.hasConnection;

export default navSlice.reducer