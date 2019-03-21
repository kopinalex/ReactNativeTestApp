import React, {Component, Fragment} from 'react';
import {
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Clipboard,
    Image,
    Share,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Text, Button, Avatar, Overlay} from 'react-native-elements';
import {DocumentPicker, ImagePicker, Permissions} from 'expo';
import {setAvatar, setEmail, setName, setNameDefined, setPassword} from "../actions/startScreenActions";
import RegisterComponent from "../components/RegisterComponent/RegisterComponent";
import {uploadDocumentAsync, uploadImageAsync} from '../services/fileUploadServ';
import {backendApi} from "../constants/apiSetting";

class ProfileScreen extends Component {
    static navigationOptions = {
        title: 'Profile'
    };
    state = {
        image: null,
        uploading: false,
        avatarEditMode: false,
        file: null,
    };

    render() {
        const {nameIsSet, name, avatar, email, setName, setPassword, setAvatar} = this.props;
        const {avatarEditMode} = this.state;
        return (
            <Fragment>
                <ScrollView style={styles.loginContainer}>
                    <RegisterComponent/>

                    {nameIsSet && <View style={{
                        flex: 1, width: '100%',
                        justifyContent: 'center', padding: 15,
                        alignItems: 'center'
                    }}>
                        <Avatar
                            rounded
                            source={{uri: avatar}}
                            icon={{name: 'user', type: 'font-awesome'}}
                            size="xlarge"
                            activeOpacity={0.7}
                            onPress={() => {
                                this._pickImage()
                            }}
                            onEditPress={() => {
                                this.setState({avatarEditMode: true})
                            }}
                            showEditButton
                        />
                        {avatarEditMode && <Overlay
                            isVisible={avatarEditMode}
                            onBackdropPress={() => this.setState({avatarEditMode: false})}
                            width="auto"
                            height="auto"
                            borderRadius={15}
                            overlayStyle={{padding: 40}}
                        >
                            <View>
                                <Button
                                    onPress={() => {
                                        this._pickImage().then(this.setState({avatarEditMode: false}))
                                    }}
                                    icon={
                                        <Icon
                                            name="image"
                                            size={25}
                                            color="white"
                                        />
                                    }
                                    title="From images"
                                    containerStyle={{margin: 20}}
                                    buttonStyle={{padding: 20}}
                                    titleStyle={{paddingLeft: 20}}
                                />

                                <Button
                                    onPress={() => {
                                        this._takePhoto().then(this.setState({avatarEditMode: false}))
                                    }}
                                    icon={
                                        <Icon
                                            name="camera-retro"
                                            size={25}
                                            color="white"
                                        />
                                    }
                                    title="Make photo"
                                    containerStyle={{margin: 20}}
                                    buttonStyle={{padding: 20}}
                                    titleStyle={{paddingLeft: 20}}
                                />
                            </View>
                        </Overlay>}
                        <Text h4>{name}</Text>
                        <Text>{email}</Text>
                        <Button
                            onPress={() => {
                                this._getFile()
                            }}
                            icon={
                                <Icon
                                    name="file"
                                    size={25}
                                    color="white"
                                />
                            }
                            title="Upload file"
                            containerStyle={{margin: 20}}
                            buttonStyle={{padding: 20}}
                            titleStyle={{paddingLeft: 20}}
                        />
                        {this.state.file && <Text onPress={this._copyToClipboard}>{this.state.file}</Text>}
                    </View>}

                    {/*{this._maybeRenderImage()}*/}
                </ScrollView>
                {this._maybeRenderUploadingOverlay()}
            </Fragment>
        )
    }


    // =========== UPLOADING INDICATOR ============ //
    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View
                    style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
                    <ActivityIndicator color="#fff" size="large"/>
                </View>
            );
        }
    };

    _maybeRenderImage = () => {
        let {
            image
        } = this.state;

        if (!image) {
            return;
        }
        return (
            <View
                style={styles.maybeRenderContainer}>
                <View
                    style={styles.maybeRenderImageContainer}>
                    <Image source={{uri: image}} style={styles.maybeRenderImage}/>
                </View>

                <Text
                    onPress={this._copyToClipboard}
                    onLongPress={this._share}
                    style={styles.maybeRenderImageText}>
                    {image}
                </Text>
            </View>
        );
    };

    _share = () => {
        Share.share({
            message: this.state.image,
            title: 'Check out this photo',
            url: this.state.image,
        });
    };

    _copyToClipboard = () => {
        Clipboard.setString(this.state.file);
        alert('Copied image URL to clipboard');
    };

    _takePhoto = async () => {
        const {
            status: cameraPerm
        } = await Permissions.askAsync(Permissions.CAMERA);

        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera AND camera roll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [3, 3],
            });

            this._handleImagePicked(pickerResult);
        }
    };

    _pickImage = async () => {
        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera roll
        if (cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [3, 3],
            });
            this._handleImagePicked(pickerResult);
        }
    };

    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;

        try {
            this.setState({
                uploading: true
            });

            if (!pickerResult.cancelled) {
                uploadResponse = await uploadImageAsync(pickerResult.uri);
                uploadResult = await uploadResponse.json();
                this.props.setAvatar(backendApi + uploadResult.path);
            }
        } catch (e) {
            console.log({uploadResponse});
            console.log({uploadResult});
            console.log({e});
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({
                uploading: false
            });
        }
    };

    _getFile = async () => {
        let result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true});
        this._handleFilePicked(result);
    };

    _handleFilePicked = async pickerResult => {
        let uploadResponse, uploadResult;

        try {
            this.setState({
                uploading: true
            });

            if (pickerResult.type === 'success') {
                this.setState({file: pickerResult.name});
                uploadResponse = await uploadDocumentAsync(pickerResult.uri, pickerResult.name);
                uploadResult = await uploadResponse.json();
                this.setState({file: backendApi + uploadResult.path});
            }
        } catch (e) {
            console.log({uploadResponse});
            console.log({uploadResult});
            console.log({e});
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({
                uploading: false
            });
        }
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.infoReducer.name,
        nameIsSet: state.infoReducer.nameIsSet,
        email: state.infoReducer.email,
        avatar: state.infoReducer.avatar
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setName(name))
        },
        setNameDefined: (isDefined) => {
            dispatch(setNameDefined(isDefined))
        },
        setEmail: (email) => {
            dispatch(setEmail(email))
        },
        setPassword: (password) => {
            dispatch(setPassword(password))
        },
        setAvatar: (avatar) => {
            dispatch(setAvatar(avatar))
        }
    }
};

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        width: '100%',
    },
    loginContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 30,
        paddingTop: '20%',
    },
    loginHeader: {
        color: '#2273AF',
        marginBottom: 7,
        textAlign: 'center'
    },
    loginInput: {
        backgroundColor: 'rgba(255,255,255,.4)',
        borderStyle: 'solid',
        borderColor: '#ffffff',
        borderWidth: 1,
        padding: 5,
        borderRadius: 20,
        marginBottom: 10,
    },
    maybeRenderUploading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    maybeRenderContainer: {
        borderRadius: 3,
        elevation: 2,
        marginTop: 30,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        width: 250,
    },
    maybeRenderImageContainer: {
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        overflow: 'hidden',
    },
    maybeRenderImage: {
        height: 250,
        width: 250,
    },
    maybeRenderImageText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);