import React, { useState, useEffect } from 'react'
import { View, Text, Image, TextInput, StyleSheet } from 'react-native'

import { toDataURL } from './../logic/imageLogic';

const UrlUploader = (props) => {
    const [imageUrl, updateImageUrl] = useState('https://facebook.github.io/react-native/docs/assets/favicon.png')

    useEffect(() => {
        savePhoto(imageUrl)
    }, [])

    const _handleImageUrlUpdate = (input) => {
        console.log(input)
        updateImageUrl(input)
        console.log(imageUrl)
        savePhoto(input)
    }

    const savePhoto = (input) => {
        toDataURL(input, (base64) => {
            console.log('this is base64', base64)
            props.updatePhoto(base64)
        })
    }

    return (
        <View style={styles.container}>
            <Text>Add an Image Url Below</Text>
            <TextInput
                onChangeText={_handleImageUrlUpdate}
                style={styles.input}
            />
            {/* <View style={{ flex: 1, width: 400, }}> */}
            <Image
                source={{ uri: imageUrl }}
                style={styles.imageThumbnail}
            />
            {/* </View> */}
        </View>
    )
}

export default UrlUploader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    image: {
        height: 200,
        width: 200,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1.5,
        // height: 100,
        width: '100%',
    },
    input: {
        margin: 20,
        height: 35,
        width: '70%',
        borderWidth: 1,
        // borderColor: 'black',
    },
})


// https://images.immediate.co.uk/production/volatile/sites/4/2009/07/GettyImages-931270318-43ab672.jpg?quality=45&resize=960,413