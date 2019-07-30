import React, { useState, useEffect, Fragment } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView } from 'react-native'

import Camera from "./../library/components/Camera";
import Button from './../library/components/Button';

const Welcome = (props) => {
    const [showCamera, toggleShowCamera] = useState(false)
    const [ipAddress, updateIpAddress] = useState('10.17.156.103')
    const [ipEdit, toggleIpEdit] = useState(false)
    const [validIP, updateValidIP] = useState(true)



    const _ipValidation = (newIP) => {
        Valid_IP = false;
        ipParts = newIP.split(".");
        if (ipParts.length == 4) {
            for (i = 0; i < 4; i++) {
                TheNum = parseInt(ipParts[i]);
                if (TheNum >= 0 && TheNum <= 255) {

                } else {
                    return Valid_IP
                }
            }
            if (i == 4) Valid_IP = true;
        }
        return Valid_IP
    }

    const openCamera = () => {
        console.log('camera')
        toggleShowCamera(!showCamera)
    }
    const openCameraRoll = () => {
        console.warn('camera roll')
    }

    const _next = (args = {}, location = 'Capture') => {
        props.navigation.navigate(location, args)
    }

    const _handleIpTextUpdate = (input) => {
        updateIpAddress(input)
        const valid = _ipValidation(input)
        updateValidIP(valid)
    }

    const buttonContent = [
        {
            title: 'Click to Take Photo',
            onPress: _next,
            onPressArgs: {
                type: 'camera',
                ipAddress,
            },
        },
        {
            title: 'Click to Select Photo',
            onPress: _next,
            onPressArgs: {
                type: 'cameraRoll',
                ipAddress,
            },
        },
        {
            title: 'Click to Add URL',
            onPress: _next,
            onPressArgs: {
                type: 'url',
                ipAddress,
            },
        },
    ];

    const buttons = buttonContent.map((e, i) => (
        <Button
            key={i}
            title={e.title}
            onPress={e.onPress}
            onPressArgs={e.onPressArgs}
        />
    ))

    return (
        <SafeAreaView style={styles.container}>
            {showCamera && <Camera updatePhoto={updatePhoto} toggleShowCamera={toggleShowCamera} />}
            <View style={styles.textContainer}>
                <Text style={{ fontSize: 25 }}>
                    Welcome to
                </Text>
                <Text style={{ fontSize: 35, margin: 5 }}>
                    Dog-Not-Dog
                </Text>
                <Text>First add the ip address you would like to use</Text>
            </View>
            <View style={styles.textContainer}>
                {ipEdit ? (
                    <Fragment>
                        <Text> Default is 10.17.156.103</Text>
                        <TextInput
                            placeholder={ipAddress}
                            onChangeText={_handleIpTextUpdate}
                            style={[styles.input, validIP ? styles.inputSuccess : styles.inputFail]}
                            keyboardType={'numeric'}
                            clearTextOnFocus
                        />
                    </Fragment>
                ) : (
                        <Text>Edit IP Address</Text>
                    )}
                <Button title={ipEdit ? 'Save' : 'Edit'} onPress={toggleIpEdit} onPressArgs={!ipEdit} />
            </View>

            <View style={styles.btnContainer}>
                <Text style={{ fontSize: 20, marginBottom: 15 }}>Take or add a photo of a dog or not a dog</Text>
                {buttons}
            </View>
        </SafeAreaView>
    )
}

export default Welcome


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    btnContainer: {
        // height: 200,
        // backgroundColor: '#234323',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    input: {
        margin: 10,
        height: 35,
        width: 150,
        borderWidth: 1,
        borderColor: 'black',
    },
    inputSuccess: {
        borderColor: 'green',
    },
    inputFail: {
        borderColor: 'red',

    },

})