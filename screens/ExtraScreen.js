import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, ImageBackground} from 'react-native';
import {connect} from "react-redux";
import {styles as commonStyles} from './homeScreenStyle'

class ExtraScreen extends Component {

    render() {
        const {name} = this.props;
        return (

            <ImageBackground
                source={require('../assets/images/Internet-Web-Glow-Web.jpg')}
                style={{height: '100%'}}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.textStyle}>extra</Text>
                        <View style={styles.textContainer}>
                            <Text style={{color:'#e2e2e2',fontSize: 22}}>{name}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={commonStyles.buttonContainer}>
                            <Button color={styles.buttonStyle.color}
                                    onPress={() => this.props.navigation.navigate('Home')}
                                    title='Home'/>
                        </View>
                        <View style={commonStyles.buttonContainer}>
                            <Button color={styles.buttonStyle.color}
                                    onPress={() => this.props.navigation.navigate('Links')}
                                    title='To Info tab'/>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    textStyle: {
        color: '#f5ea6f',
        fontSize: 22,
        fontFamily: 'noto-bold',
        padding: 10,
        textAlign: 'center'
    },
    buttonStyle: {
        color: '#2273af'
    },
    textContainer: {
        height: 200,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'rgba(255,255,255,.3)',
        borderRadius: 20,
        margin: 20,
        padding: 15,
        backgroundColor: 'rgba(255,255,255,.1)',
    }
});

const mapStateToPros = (state) => {
    return {
        name: state.infoReducer.name
    }
};

export default connect(mapStateToPros, null)(ExtraScreen);