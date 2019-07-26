import React, { useEffect, useState } from 'react'
import { View, Text, CameraRoll } from 'react-native'

const CameraRoll = () => {
    useEffect(() => {
        const params = {
            assetType: 'Photos'
        }
        CameraRoll.getPhotos(params)
            .then((res) => {
                console.log(res)
            })
            .catch(err => {
                console.warn(err)
            })

    }, [])


    return (
        <View>
            <Text>This is the Camera Roll</Text>
        </View>
    )
}

export default CameraRoll
