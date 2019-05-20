import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, TouchableOpacity, StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import styles from './styles';

const Header = ({ title, navigation, back }) => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    {back ? (
      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <Icon
          name="chevron-left"
          size={16}
          style={styles.icon}
        />
      </TouchableOpacity>
    ) : (
      <View style={styles.left} />
    )}
    <Text style={styles.title}>{title}</Text>
    <View style={styles.left} />
  </View>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  back: PropTypes.bool.isRequired,
};

export default withNavigation(Header);
