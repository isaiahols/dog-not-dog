import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native'
import Button from './../library/components/Button';
import Camera from "./../library/components/Camera";
import CameraRoll from './../library/components/CameraRoll';
import UrlUploader from "./../library/components/UrlUploader";
import axios from "axios";

const Capture = (props) => {
    const [photo, updatePhoto] = useState('')
    const [loading, updateLoading] = useState(false)
    const nav = props.navigation;
    const type = props.navigation.getParam('type')

    const sendPhoto = (photoString, endpoint) => {
        const ipAddress = nav.getParam('ipAddress')
        const data = {
            Img: photoString,
        }

        return new Promise(async (resolve, reject) => {
            const url = `http://${ipAddress}:25052/${endpoint}`
            try {
                const response = await axios.post(url, data)
                resolve(response.data)
            }
            catch (err) {
                reject(err)
            }
        })
    }

    const next = async (endpoint) => {
        updateLoading(true);
        try {
            // const res = { Result: false, Confidence: 0.45, Msg: 'not dog' }
            const res = await sendPhoto(photo, endpoint)
            // console.log("This is Response", res)
            updateLoading(false);
            nav.navigate('Results', { response: res, imageBase64: photo, endpoint, })
        }
        catch (err) {
            const res = { Result: false, Confidence: 0.45, Msg: 'not dog' }
            console.warn('there was an issue with the server', err)
            Alert.alert(
                'Check that your server is running',
                'there was a server error that is likely it timing out',
                [
                    { text: 'Continue with Text Data', onPress: () => nav.navigate('Results', { response: res, imageBase64: photo, endpoint, }) },
                    { text: 'Cancel', onPress: () => nav.navigate('Welcome') }
                ]
            )
        }
    }

    const back = () => {
        nav.navigate('Welcome')
    }

    const comingSoon = () => {
        Alert.alert('Coming Soon', 'We are just building this test app and this feature will be added soon')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cameraContainer}>
                {type === 'camera' && <Camera updatePhoto={updatePhoto} photo={photo} />}
                {type === 'cameraRoll' && comingSoon()}
                {/* {type === 'cameraRoll' && <CameraRoll updatePhoto={updatePhoto} />} */}
                {type === 'url' && <UrlUploader updatePhoto={updatePhoto} />}
                {loading && <ActivityIndicator size='large' color="#00ff00" style={styles.loader} />}
            </View>
            <View style={styles.btnContainer}>
                <View style={[styles.dogNotDogContainer, !photo && styles.prePhotoBtn]}>
                    <Button
                        onPress={() => next('dog')}
                        title='Dog'
                        btnStyle={{ width: 120 }} />
                    <Button
                        onPress={() => next('notdog')}
                        title='Not Dog'
                        btnStyle={{ width: 120 }} />
                </View>
                {/* <Button onPress={next} title='Test' /> */}
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
    dogNotDogContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',

    },
    prePhotoBtn: {
        opacity: .7,
    },
    loader: {
        position: 'absolute',
        top: '45%',
        alignSelf: 'center',
    },
})

export default Capture
