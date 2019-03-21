import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text, Button,
    TouchableOpacity,
    View, TextInput, Picker,
} from 'react-native';
import {WebBrowser} from 'expo';
// import ExtraScreen from 'ExtraScreen';

import {MonoText, PrettySlyledText} from '../components/StyledText';
import {styles as commonStyles} from './homeScreenStyle'
import {setName, setNameDefined} from "../actions/startScreenActions";
import {connect} from "react-redux";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            game: '',
        }
    }

    static navigationOptions = {
        header: null,
    };

    render() {
        const {name, nameIsSet, setName, setNameDefined} = this.props;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={commonStyles.flexContainer}>
                        <TouchableOpacity>
                            <Image source={require('../assets/images/icon1.png')}/>
                        </TouchableOpacity>
                    </View>

                    {!nameIsSet && <TextInput style={commonStyles.textInput}
                                              placeholder={'input your name'}
                                              onChangeText={(text) => {
                                                  this.setState({name: text.trim()});
                                                  setName(text.trim());
                                              }}
                    />}
                    <View style={commonStyles.buttonContainer}>
                        {!nameIsSet && <Button disabled={!this.state.name.trim()} title={'Готово'} onPress={()=>{setNameDefined(true)}}/>}

                        {nameIsSet &&
                        <View>
                            <Picker
                                selectedValue={this.state.game}
                                style={{height: 50, width: '100%'}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({game: itemValue})
                                }>
                                <Picker.Item label="Кубик D6" value="D6" />
                                <Picker.Item label="Кубик D12" value="D12" />
                                <Picker.Item label="Кубик D20" value="D20" />
                                <Picker.Item label="Да - Нет" value="binary" />
                            </Picker>
                            <Button title="Перейти" color={commonStyles.buttonStyle.color}
                                    onPress={this.handlePressButton}/>
                        </View>
                        }
                    </View>
                </View>

            </ScrollView>
        );
    }

    handlePressButton = () => {
        this.props.navigation.navigate('Extra');
    };

    handleChangeName = (text) => {
        this.props.setName(text);
    };

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
                    Learn more
                </Text>
            );

            return (
                <Text style={styles.developmentModeText}>
                    Development mode is enabled, your app will be slower but you can use useful development
                    tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                <Text style={[styles.developmentModeText]}>
                    You are not in development mode, your app will run at full speed.
                </Text>
            );
        }
    }

    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    };

    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
            'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#cff8ff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 300,
        height: 100,
        resizeMode: 'contain',
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(255,255,200, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#bebebe',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: '#065798',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    simpleTextMessage: {
        fontSize: 20,
        color: 'green',
        textAlign: 'center',
    },
    testScrollView: {
        // height: '200',
        backgroundColor: 'white',
    },
    textRed: {
        color: 'red'
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setName(name))
        },
        setNameDefined: (isDefined) => {dispatch(setNameDefined(isDefined))}
    }
};

const mapStateToPros = (state) => {
    return {
        name: state.infoReducer.name,
        nameIsSet: state.infoReducer.nameIsSet,
    }
};


export default connect(mapStateToPros, mapDispatchToProps)(HomeScreen);