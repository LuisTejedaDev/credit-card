import {useEffect} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {setKeyboard} from '../slices/appSlice';

/* 
    Este customHook nos va a funcionar para saber cuando el teclado se abre tanto en Android como en iOS,
    tiene muchos casos de uso, pero principalmente para mantener una buena relación de aspecto con
    la UI.

    Ej. Cuando un modal contiene una caja de texto, al abrir el teclado este tapa nuestra caja. Lo
    que impide que se visualice nuestro contenido. Al tener disponible esta variable, podemos saber
    cuando nuestro teclado esta abierto y reconfigurar la UI.
*/

export default () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => dispatch(setKeyboard(true)));
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => dispatch(setKeyboard(false)));

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
}