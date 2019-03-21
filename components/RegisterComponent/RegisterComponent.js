import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
    ScrollView, StyleSheet,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Text, Button} from 'react-native-elements';
import {setEmail, setName, setNameDefined, setPassword} from "../../actions/startScreenActions";

class RegisterComponent extends Component {

    render() {
        const {nameIsSet, setName, setEmail, setPassword} = this.props;
        if (nameIsSet) {
            return null;
        }
        return (
            <Fragment>
                <Text h4 h4Style={styles.loginHeader}>Register:</Text>
                <Input
                    placeholder='Your name'
                    leftIcon={
                        <Icon
                            name='user'
                            size={20}
                            color='#2273AF'
                        />
                    }
                    label='Name'
                    labelStyle={{marginLeft: 10, color: '#2273AF'}}
                    inputStyle={{paddingLeft: 10}}
                    containerStyle={styles.loginInput}
                    onChangeText={(text) => {
                        setName(text.trim());
                    }}
                />
                <Input
                    placeholder='email'
                    leftIcon={
                        <Icon
                            name='at'
                            size={20}
                            color='#2273AF'
                        />
                    }
                    label='E-mail'
                    labelStyle={{marginLeft: 10, color: '#2273AF'}}
                    inputStyle={{paddingLeft: 10}}
                    containerStyle={styles.loginInput}
                    onChangeText={(text) => {
                        setEmail(text.trim());
                    }}
                />
                <Input
                    placeholder='password'
                    leftIcon={
                        <Icon
                            name='ellipsis-h'
                            size={20}
                            color='#2273AF'
                        />
                    }
                    label='Password'
                    labelStyle={{marginLeft: 10, color: '#2273AF'}}
                    inputStyle={{paddingLeft: 10}}
                    containerStyle={styles.loginInput}
                    onChangeText={(text) => {
                        setPassword(text);
                    }}
                />

                <Button
                    icon={
                        <Icon
                            name="check-circle"
                            size={20}
                            color="white"
                        />
                    }
                    containerStyle={{margin: 15}}
                    buttonStyle={{padding: 20}}
                    titleStyle={{paddingLeft: 20}}
                    title="Send"
                    onPress={this._sendUserDataHandler}
                />
            </Fragment>
        )
    }

    _sendUserDataHandler = () => {
        const {setNameDefined, name, email} = this.props;
        if (name && email) {
            setNameDefined(true);
        }
    };

}

const styles = StyleSheet.create({
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
});


const mapStateToProps = (state) => {
    return {
        name: state.infoReducer.name,
        nameIsSet: state.infoReducer.nameIsSet,
        email: state.infoReducer.email,
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);