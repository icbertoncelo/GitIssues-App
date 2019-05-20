import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';
import {
  View, Text, ActivityIndicator, FlatList,
} from 'react-native';

import Header from '~/components/Header';
import IssueItem from './IssueItem';
import styles from './styles';

class Issues extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    issues: [],
    loadingList: true,
    refreshing: false,
    error: '',
  };

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    this.setState({ refreshing: true });

    const { navigation } = this.props;
    const repositoryName = navigation.getParam('full_name');

    try {
      const { data } = await api.get(`/repos/${repositoryName}/issues`);
      this.setState({ issues: data });
    } catch {
      this.setState({ error: 'Error to load the issue' });
    } finally {
      this.setState({ loadingList: false, refreshing: false });
    }
  };

  renderListItem = ({ item }) => <IssueItem issue={item} />;

  renderList = () => {
    const { refreshing, issues } = this.state;

    return !issues.length ? (
      <Text style={styles.empty}>No issues added</Text>
    ) : (
      <FlatList
        data={issues}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadIssues}
        refreshing={refreshing}
        style={styles.listContainer}
      />
    );
  };

  render() {
    const { loadingList, error } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header
          title={navigation.getParam('title')}
          back
        />
        {!!error && <Text style={styles.error}>{error}</Text>}
        {loadingList ? (
          <ActivityIndicator
            size="large"
            style={styles.loading}
            color="#fff"
          />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}

export default Issues;
