import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

class Camera extends Component {


    render() {
        return (
            <View style={styles.container}>
                {!this.props.photo ? (
                    <Fragment>

                        <RNCamera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            style={styles.preview}
                            type={RNCamera.Constants.Type.back}
                            flashMode={RNCamera.Constants.FlashMode.on}
                            captureAudio={false}
                            androidCameraPermissionOptions={{
                                title: 'Permission to use camera',
                                message: 'We need your permission to use your camera',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                            androidRecordAudioPermissionOptions={{
                                title: 'Permission to use audio recording',
                                message: 'We need your permission to use your audio',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                            onGoogleVisionBarcodesDetected={({ barcodes }) => {
                                console.log(barcodes);
                            }}
                        />
                        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                                <Text style={{ fontSize: 14 }}> SNAP </Text>
                            </TouchableOpacity>
                        </View>
                    </Fragment>
                ) : (
                        <View>
                            <Image
                                source={{ uri: this.props.photo }}
                                style={styles.imageThumbnail}
                            />
                        </View>
                    )}
            </View>
        );
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            const base64 = `data:image/png;base64,${data.base64}`
            this.props.updatePhoto(base64)
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: '50%',
        flexDirection: 'column',
        // backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1.5,
        // height: 100,
        width: '100%',
    },
});

export default Camera