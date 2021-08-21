import React, { useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, PanResponder, Animated } from 'react-native';
import Completed from './completeddata';
import Uncomplete from './uncompleteddata'

const phoneWidth = Dimensions.get('window').width;



const App = (props) => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                //return true if user is swiping, return false if it's a single click
                return !(gestureState.dx === 0 && gestureState.dy === 0)
            },
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y }
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset();
            }
        })
    ).current;

    const Incomplete = () => {
        return (
            <View>
                <Uncomplete uncompletedTodo={props.todoData} deleteButton={(id) => props.deleteTodo(id)} />
            </View>
        )
    }



    return (
        <View style={styles.container}>
            <View>
                <Completed completedTodo={props.todoData} />
            </View>

            <Animated.View
                style={{
                    transform: [{ translateX: pan.x }, { translateY: 1 }]
                }}
                {...panResponder.panHandlers}
            >
                <Incomplete />
            </Animated.View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: phoneWidth,
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 20,
        height: '100%'
    },

})

export default App;