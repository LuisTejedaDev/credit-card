import {useRef, useEffect, useState} from "react"
import {Animated, Dimensions, Image, PanResponder, StyleSheet, Text, View} from "react-native"
import {useDispatch, useSelector} from "react-redux"
import {selectShow, selectCards, setCards} from "../slices/cardSlice"

export default () => {

    const dispatch = useDispatch()
    
    const cards = useSelector(selectCards)
    const show = useSelector(selectShow)
    
    const [id, setId] = useState(null)

    const translate = useRef(new Animated.ValueXY(0)).current
    
    const translateY = useRef(new Animated.Value(0)).current
    const opacity = useRef(new Animated.Value(1)).current

    const handleAnimated = () => { 
        Animated.spring(translateY, {
            toValue: show ? 1 : 0,
            friction: 8,
            tension: 50,
            useNativeDriver: false
        }).start()
    }

    useEffect(() => {
        handleAnimated()
    }, [show])
    
    useEffect(() => {
        const temporalId = cards[0]?.id
        setId(temporalId)
    }, [cards])

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => true,

        onPanResponderMove: Animated.event([
            null,
            {
                dx: translate.x,
                dy: translate.y
            }
        ],{useNativeDriver: false}),
        
        onPanResponderRelease: (e, {dx, dy, vx, vy}) => {
            if(Math.abs(dx) > 200){
                Animated.decay(translate, {
                    velocity: {x: vx, y: vy},
                    deceleration: 0.98,
                    useNativeDriver: false
                }).start(({finished}) => {
                    if(finished){
                        if(!show) handleNext()
                        else {
                            Animated.spring(translate, {
                                toValue: ({x: 0, y: 0}),
                                friction: 12,
                                useNativeDriver: false
                            }).start()
                        }
                    }
                })
            } else {
                Animated.spring(translate, {
                    toValue: ({x: 0, y: 0}),
                    friction: 12,
                    useNativeDriver: false
                }).start()
            }
        },
    })

    const handleNext = () => {
        const first = cards.find(x => x.id === id)
        const sinFirst = cards.filter(x => x.id !== first.id)
        const nuevos = [...sinFirst, first]
        const mapeados = nuevos.map((x,i,a) => ({...x, index: i+1}))
        dispatch(setCards(mapeados))
        translate.setValue({x: 0, y: 0})
    }

    return( 
        cards.slice(0,3).reverse().map((x,i,a) => {
            const firstItem = (i+1) === a[a.length-1].index
            const isLastItem = (i+1) === a.length

            const translateStyles = {
                transform: [
                    {
                        scale: (isLastItem && !show) ? translate.x.interpolate({
                            inputRange: [-100, 0, 100],
                            outputRange: [1.1, 1, 1.1],
                            extrapolate: 'clamp'
                        }) : 1
                    },
                    {
                        translateY: translateY.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, (firstItem || isLastItem) ? firstItem ? -125 : 125 : 0],
                            extrapolate: 'clamp'
                        }) 
                    },
                    {
                        rotate: translateY.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', (firstItem || isLastItem) ? firstItem ? '-20deg' : '20deg' : '0deg'],
                            extrapolate: 'clamp'
                        })
                    },
                    {
                        translateX: (isLastItem && !show) ? translate.x.interpolate({
                            inputRange: [-250, 250],
                            outputRange: [(-1) * Dimensions.get('window').width, Dimensions.get('window').width],
                            extrapolate: 'clamp'
                        }) : 0
                    }
                ]
            }

            return(
                <Animated.View
                    key={x.id}
                    style={
                        [
                            styles.card, 
                            {backgroundColor: x.backgroundColor},
                            translateStyles
                        ]}
                    {...panResponder.panHandlers}
                >
                    
                    <View style={{height: 60, alignSelf: 'stretch', flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Image 
                                style={{height: 50, width: 50}}
                                source={{uri: x.banco}}
                            />
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                            <Image 
                                style={{height: 50, width: 50}}
                                source={{uri: x.compania}}
                            />
                        </View>
                    </View>

                    <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Image 
                            style={{height: 35, width: 45}}
                            source={{uri: 'https://i.ibb.co/G3pr5Sg/chip.png'}}
                        />
                    </View>

                    <View style={{height: 60, alignSelf: 'stretch', flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#fff'}}>{x.digitos}</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>{x.tipo}</Text>
                        </View>
                    </View>

                </Animated.View>
            )
        })
    )
}

const styles = StyleSheet.create({
    card: {
        height: 200,
        width: '100%',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute',
    }
})