import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Cards } from "./Components"
import { useDispatch, useSelector } from "react-redux"
import { selectShow, setShow } from "./slices/cardSlice"

export default () => {
    const dispatch = useDispatch()
    const show = useSelector(selectShow)

    return(
        <>
            <SafeAreaView style={{flex: 0, backgroundColor: '#2A78C0'}}/>
            <View style={styles.container}>
                <Cards />
                <TouchableOpacity
                    onPress={() => dispatch(setShow(!show))}
                    style={{height: 50, width: '85%', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 20}}>
                    <Text style={{fontSize: 18, fontWeight: '500', color: '#2A78C0'}}>{show ? 'Ocultar tarjetas' : 'Mostrar tarjetas'}</Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={{flex: 0, backgroundColor: '#2A78C0'}}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 15
    }
})