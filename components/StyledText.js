import React from 'react';
import {Text} from 'react-native';

export class MonoText extends React.Component {
    render() {
        return <Text {...this.props} style={[this.props.style, {fontFamily: 'space-mono'}]}/>;
    }
}

export class PrettySlyledText extends React.Component {
    render() {
        return <Text {...this.props} style={[this.props.style, {fontFamily:'noto-bold-italic', fontWeight: '700', color: '#2000f8'}]}/>
    }
}
