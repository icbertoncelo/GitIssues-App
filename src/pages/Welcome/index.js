import React, { Component } from 'react';
import api from '~/services/api';
import AsyncStorage from '@react-native-community/async-storage';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

import Header from '~/components/Header';
import RepositoryItem from './RepositoryItem';

class Welcome extends Component {
  state = {
    repositoryInput: '',
    repositories: [],
    loadingButton: false,
    loadingList: true,
    error: '',
    refreshing: false,
  };

  componentDidMount() {
    this.loadRepositories();
  }

  addRepository = async () => {
    const { repositoryInput, repositories, loadingList } = this.state;

    if (loadingList) return;
    this.setState({ loadingButton: true });

    if (!repositoryInput) {
      this.setState({
        error: 'Fill in the repository to continue',
        loadingButton: false,
      });
      return;
    }

    if (repositories.find(repository => repository.full_name === repositoryInput)) {
      this.setState({ error: 'Duplicate repository', loadingButton: false });
      return;
    }

    try {
      const { data } = await api.get(`/repos/${repositoryInput}`);

      this.setState({
        repositoryInput: '',
        error: '',
        repositories: [...repositories, data],
      });

      await AsyncStorage.setItem(
        '@GitIssues:repositories',
        JSON.stringify([...repositories, data]),
      );
    } catch (_err) {
      this.setState({ repositoryInput: '', error: 'Repository does not exist' });
    } finally {
      this.setState({ loadingButton: false });
    }
  };

  loadRepositories = async () => {
    this.setState({ refreshing: true });

    const repositories = JSON.parse(
      await AsyncStorage.getItem('@GitIssues:repositories'),
    );

    this.setState({
      repositories: repositories || [],
      loadingList: false,
      refreshing: false,
    });
  };

  renderListItem = ({ item }) => <RepositoryItem repository={item} />;

  renderList = () => {
    const { repositories, refreshing } = this.state;

    return !repositories.length ? (
      <Text style={styles.empty}>No repositories added</Text>
    ) : (
      <FlatList
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
        style={styles.listContainer}
      />
    );
  };

  render() {
    const {
      repositoryInput, loadingButton, loadingList, error,
    } = this.state;

    return (
      <View style={styles.container}>
        <Header
          title="GitIssues"
          back={false}
        />
        {!!error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Add new repository"
            underlineColorAndroid="transparent"
            value={repositoryInput}
            onChangeText={text => this.setState({ repositoryInput: text })}
          />
          <TouchableOpacity onPress={this.addRepository}>
            {loadingButton ? (
              <ActivityIndicator
                size="small"
                color="#FFF"
              />
            ) : (
              <Icon
                name="plus"
                size={30}
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
        </View>
        {loadingList ? (
          <ActivityIndicator
            size="large"
            style={styles.loading}
            color="#FFF"
          />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}

export default Welcome;
