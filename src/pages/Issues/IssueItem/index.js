import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Image, Text, TouchableOpacity, Linking,
} from 'react-native';

import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const IssueItem = ({ issue }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => Linking.openURL(issue.html_url)}
  >
    <Image
      style={styles.avatar}
      source={{ uri: issue.user.avatar_url }}
    />
    <View style={styles.info}>
      <Text
        style={styles.title}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {issue.title}
      </Text>
      <Text style={styles.author}>{issue.user.login}</Text>
    </View>
    <Icon
      name="angle-right"
      size={20}
      style={styles.icon}
    />
  </TouchableOpacity>
);

IssueItem.propTypes = {
  issue: PropTypes.shape({
    user: PropTypes.shape({
      avatar_url: PropTypes.string,
      login: PropTypes.string,
    }),
    title: PropTypes.string,
    html_url: PropTypes.string,
  }).isRequired,
};

export default withNavigation(IssueItem);
