import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, } from 'react-native';
import * as Progress from 'react-native-progress';
import Button from './../library/components/Button';

const Results = (props) => {
    const imageBase64 = props.navigation.getParam('imageBase64');
    const { Msg, Result, Confidence } = props.navigation.getParam('response');
    const endpoint = props.navigation.getParam('endpoint');

    const back = () => {
        props.navigation.navigate('Welcome')
    }

    const iconDisplay = () => {
        let iconPath = require('./../res/assets/icons/dog.png');
        if (endpoint === 'dog') {
            iconPath = Result ? require('./../res/assets/icons/dog.png') : require('./../res/assets/icons/no-pets.png');
        } else if (endpoint === 'notdog') {
            iconPath = Result ? require('./../res/assets/icons/no-pets.png') : require('./../res/assets/icons/dog.png');
        }
        return <Image style={styles.icon} source={iconPath} />
    }

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.resultContainer}>
                <Text style={[styles.text, styles.titleText]}>Dog? Not dog?</Text>
                {iconDisplay()}
                <Progress.Bar progress={Confidence} width={200} />
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: `${imageBase64}` }} />
            </View>
            <View style={styles.msgContainer}>
                <Text style={styles.text}>Here is what we know</Text>
                <Text styles={styles.text}>{Msg}</Text>
            </View>
            <Button title='Back' onPress={back} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    resultContainer: {
        flex: .7,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    icon: {
        height: 50,
        width: 50,
    },
    imageContainer: {
        // flex: 1,
        alignItems: 'center',
        marginBottom: 15,
    },
    image: {
        aspectRatio: 1.4,
        width: '100%'
    },
    msgContainer: {
        flex: .5,
        width: '100%',
        alignItems: 'center',
        paddingTop: 15,
    },
    titleText: {
        fontSize: 24,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    }
})

export default Results
