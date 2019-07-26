import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Button = ({ onPress, onPressArgs, title }) => {
    const _onPress = () => {
        onPress(onPressArgs)
    }

    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={_onPress}>
            <Text style={styles.btnText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        height: 50,
        width: 170,
        backgroundColor: '#232323',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#fff'
    },
})

export default Button
