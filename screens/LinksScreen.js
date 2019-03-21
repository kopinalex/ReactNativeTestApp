import React from 'react';
import {ScrollView, StyleSheet, Text, ImageBackground, View} from 'react-native';
import {connect} from "react-redux";

class ResultsScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: "Results",
    };


    render() {
        const {name, nameIsSet} = this.props;
        return (
            <ImageBackground source={require('../assets/images/lblue.jpg')}
                             style={{height: '100%'}}>
                <View style={styles.container}>
                    <Text style={styles.greetingText}>Results for {name}:</Text>
                    <ScrollView style={styles.textContainer}>
                    </ScrollView>
                </View>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    greetingText: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'noto-bold',
        color: '#065798'
    },
    textContainer: {
        minHeight: 300,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(50,80,255,.5)',
        borderRadius: 20,
        margin: 20,
        padding: 15,
        backgroundColor: 'rgba(255,255,255,.3)',
    }
});

const mapStateToPros = (state) => {
    return {
        name: state.infoReducer.name,
        nameIsSet: state.infoReducer.nameIsSet,
    }
};

export default connect(mapStateToPros)(ResultsScreen);