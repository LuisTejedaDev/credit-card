import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    show: true,
    cards: [
        {
            id: 1,
            index: 1,
            backgroundColor: '#9EDDCB',
            banco: 'https://i.ibb.co/kxf2BSV/logo-1.png',
            tipo: 'débito',
            compania: 'https://i.ibb.co/ySsyTgg/visa.png',
            digitos: '**** **** **** 1234',
            vigencia: '09/25',
            cvc: '001'
        },
        {
            id: 2,
            index: 2,
            backgroundColor: '#EAA5B8',
            banco: 'https://i.ibb.co/Mg4WJL5/logo-2.png',
            tipo: 'crédito',
            compania: 'https://i.ibb.co/tsq3BbR/master.png',
            digitos: '**** **** **** 1234',
            vigencia: '11/33',
            cvc: '002',
        },
        {
            id: 3,
            index: 3,
            backgroundColor: '#6DB0F3',
            banco: 'https://i.ibb.co/0ZYqDjS/logo-3.png',
            tipo: 'crédito',
            compania: 'https://i.ibb.co/tsq3BbR/master.png',
            digitos: '**** **** **** 1234',
            vigencia: '02/28',
            cvc: '003'
        },
        {
            id: 4,
            index: 4,
            backgroundColor: '#82CDD7',
            banco: 'https://i.ibb.co/QYnrcbm/logo-4.png',
            tipo: 'crédito',
            compania: 'https://i.ibb.co/ySsyTgg/visa.png',
            digitos: '**** **** **** 1234',
            vigencia: '03/29',
            cvc: '004'
        },
    ],
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setShow: (state, action) => {state.show = action.payload},
        setCards: (state, action) => {state.cards = action.payload},
    }
})

export const {setShow, setCards} = navSlice.actions

export const selectShow = (state) => state.navCard.show;
export const selectCards = (state) => state.navCard.cards;

export default navSlice.reducer