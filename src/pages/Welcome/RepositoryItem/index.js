import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Image, Text, TouchableOpacity,
} from 'react-native';

import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const RepositoryItem = ({ repository, navigation }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => navigation.navigate('Issues', {
      title: repository.name,
      full_name: repository.full_name,
    })
    }
  >
    <Image
      style={styles.avatar}
      source={{ uri: repository.owner.avatar_url }}
    />
    <View style={styles.info}>
      <Text style={styles.title}>{repository.name}</Text>
      <Text style={styles.author}>{repository.owner.login}</Text>
    </View>
    <Icon
      name="angle-right"
      size={20}
      style={styles.icon}
    />
  </TouchableOpacity>
);

RepositoryItem.propTypes = {
  repository: PropTypes.shape({
    owner: PropTypes.shape({
      avatar_url: PropTypes.string,
      login: PropTypes.string,
    }),
    name: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withNavigation(RepositoryItem);
