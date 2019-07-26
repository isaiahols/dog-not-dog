import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, } from 'react-native'
import Button from './../library/components/Button';
import Camera from "./../library/components/Camera";
import CameraRoll from './../library/components/CameraRoll';

const Capture = (props) => {
    const [photo, updatePhoto] = useState('')
    const nav = props.navigation;
    const type = props.navigation.getParam('type')
    console.log(type)

    const sendPhoto = (photoString) => {
        console.log(photoString)
        const ipAddress = props.navigation.getParam('ipAddress')
        return
        fetch(
            `http://${ipAddress}:25052/notdog`, {
                method: 'POST',
                mode: 'cors', // no-cors, cors, *same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
    }

    const next = () => {
        sendPhoto(photo)
        props.navigation.navigate('Results')
    }

    const back = () => {
        props.navigation.navigate('Welcome')
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.headerText}>This is the Capture Screen</Text> */}
            <View style={styles.cameraContainer}>
                {type === 'camera' && !photo && <Camera updatePhoto={updatePhoto} />}
                {type === 'cameraRoll' && <CameraRoll updatePhoto={updatePhoto} />}
            </View>
            <View style={styles.btnContainer}>
                <Button onPress={next} title='Test' />
                <Button onPress={back} title='Back' />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: 25,
        marginVertical: 10,
        alignSelf: 'center',
    },
    btnContainer: {
        // height: 200,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: '#234323',
        marginVertical: 10,
    },
    cameraContainer: {
        flex: 1,
        minHeight: '70%',
    },
})

export default Capture
