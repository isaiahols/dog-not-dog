import React from 'react'
import { View, Text, Image, Button } from 'react-native'

const Results = (props) => {
    const imageBase64 = props.navigation.getParam('imageBase64');


    const back = () => {
        props.navigation.navigate('Welcome')
    }
    console.log(imageBase64)
    return (
        <View>
            <Text>Results</Text>
            <Image style={{ flex: 1 }} source={{ uri: `data:image/png;base64,${imageBase64}` }} />
            <Button title='Back' onPress={back}></Button>
            <Button title='Capture' onPress={() => props.navigation.navigate('Capture')}></Button>
        </View>
    )
}

export default Results
