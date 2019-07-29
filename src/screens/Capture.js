import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, } from 'react-native'
import Button from './../library/components/Button';
import Camera from "./../library/components/Camera";
import CameraRoll from './../library/components/CameraRoll';
import axios from "axios";

const Capture = (props) => {
    const [photo, updatePhoto] = useState('')
    const nav = props.navigation;
    const type = props.navigation.getParam('type')
    console.log(type)

    const sendPhoto = (photoString) => {
        console.log(photoString)
        const ipAddress = props.navigation.getParam('ipAddress')
        const data = {
            Img: photoString,
        }

        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`http://${ipAddress}:25052/notdog`, data)
                resolve(response.data)
            }
            catch (err) {
                reject(err)
            }
        })
    }

    // const sending = new Promise(async (resolve, reject) => {
    //     sendPhoto()
    // });

    const next = async () => {
        try {
            const res = await sendPhoto(photo)
            console.log("This is Response", res)
            props.navigation.navigate('Results', { response: res, imageBase64: photo })
        }
        catch (err) {
            console.warn('there was an issue with the image', err)
        }
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
                {/* {photo && <Button onPress={next} title='Test Dog' />}
                {photo && <Button onPress={next} title='Test Not Dog' />} */}
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
