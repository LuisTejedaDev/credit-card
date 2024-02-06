import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setOrientation} from '../slices/appSlice';
import Orientation from 'react-native-orientation'


/* 
    Este customHook de la orientación nos va a permitir saber cual es la orientación de nuestro dispositivo
    en todo momento, con esto podemos manejar cual es la pantalla en vertical u horizontal que tenemos que
    visualizar en nuestra aplicación.

    Así mismo lo podemos utilizar para manejar ciertos estilos en especifico, como el alto o ancho de algo
    en especifico, dependiendo cual sea la orientación.
*/

export default () => {
    const dispatch = useDispatch()

    const handleOrientationDidChange = (data) => {
        dispatch(setOrientation(data))
    }

    useEffect(() => {
        Orientation.addOrientationListener(handleOrientationDidChange);

        return () => Orientation.removeOrientationListener(handleOrientationDidChange)
    }, [])
}