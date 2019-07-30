import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";

import { toDataURL } from './../logic/imageLogic';


const CameraRollContainer = (props) => {
    const [cameraRollImages, loadImages] = useState([])


    useEffect(() => {
        console.log(cameraRollImages)
        const params = {
            first: 20,
            assetType: 'Photos',
        }
        CameraRoll.getPhotos(params)
            .then((res) => {
                console.log(res.edges)
                loadImages(res.edges)
            })
            .catch(err => {
                console.warn(err)
            })

    }, [])

    // const convertToBase64 = (imageUrl) => {
    //     ImgToBase64.getBase64String(imageUrl)
    //         .then(base64String => doSomethingWith(base64String))
    //         .catch(err => doSomethingWith(err));
    // }
    // console.log(cameraRollImages)


    const captureImage = (uri) => {

    }

    _imageDisplay = ({ item }) => {
        console.log(item.node.image.uri)
        return (
            <TouchableOpacity
                // onPress={props.updatePhoto(base64Image)} 
                style={styles.imageContainer}
            >
                <Image source={{ uri: item.node.image.uri }} style={styles.imageThumbnail} />
            </TouchableOpacity>
        )
    }

    console.log(cameraRollImages)
    return (
        <View style={styles.MainContainer} >
            <FlatList
                data={cameraRollImages}
                renderItem={_imageDisplay}
                // style={styles.photoGridContainer}
                numColumns={3}
                keyExtractor={(item, index) => index}
            />
            {/* <View style={{ marginHorizontal: 15, }}>
                {displayCameraRoll}
            </View> */}
        </View>
    )
}



export default CameraRollContainer


const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 30,
    },
    photoGridContainer: {
        // marginHorizontal: '5%',
        flex: 1,
        // flexDirection: 'row',
        backgroundColor: 'lightblue',
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
    },
    image: {
        // maxHeight: 100,
        // width: 100,
        // flex: 1,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        // width: 100,
    },
})
