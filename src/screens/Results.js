import React from 'react'
import { View, Text, Image, Button } from 'react-native'

const Results = (props) => {
    const back = () => {
        props.navigation.navigate('Welcome')
    }
    console.warn(props)
    return (
        <View>
            <Text>Results</Text>
            <Image style={{ flex: 1 }} source={{ uri: `data:image/png;base64,${props.selectedPhoto}` }} />
            <Button title='Back' onPress={back}></Button>
            <Button title='Capture' onPress={() => props.navigation.navigate('Capture')}></Button>
        </View>
    )
}

export default Results
