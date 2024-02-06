import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setHasConnection} from '../slices/appSlice';
import NetInfo from '@react-native-community/netinfo';

export default () => {
    const dispatch = useDispatch()
    useEffect(() => {
        try{
            const unsubscribe = NetInfo.addEventListener(state => {
                dispatch(setHasConnection(state.isConnected))
            });

            return unsubscribe;
        }catch(e){
            console.log('e: ', e)
            dispatch(setHasConnection(false))
        }
    }, [])
}