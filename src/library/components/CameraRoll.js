import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
// import ImgToBase64 from 'react-native-image-base64';

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
    console.log(cameraRollImages)
    const displayCameraRoll = cameraRollImages.map((image, i) => {
        // const base64Image = convertToBase64(image.node.uri)
        console.log(image.node.image.uri)
        return (
            <TouchableOpacity
                key={i}
            // onPress={props.updatePhoto(base64Image)} 
            >
                <Image source={{ uri: image.node.image.uri }} />
            </TouchableOpacity>
        )
    })

    return (
        <View>
            <Text>This is the Camera Roll</Text>
            {cameraRollImages && displayCameraRoll}
        </View>
    )
}

export default CameraRollContainer
