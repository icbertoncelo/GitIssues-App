import React, { Component } from 'react';

import {
  View, Text, TextInput, TouchableOpacity,
} from 'react-native';

import Header from '~/components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class Welcome extends Component {
  state = {
    repository: '',
  };

  render() {
    const { repository } = this.state;

    return (
      <View style={styles.container}>
        <Header title="GitIssues" />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Add new repository"
            underlineColorAndroid="transparent"
            value={repository}
            onChangeText={text => this.setState({ repository: text })}
          />
          <TouchableOpacity onPress={() => {}}>
            <Icon
              name="plus"
              size={30}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Welcome;
