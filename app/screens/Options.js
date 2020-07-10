import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StatusBar, Platform, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {ListItem, Separator} from '../components/List';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#868686';
const ICON_SIZE = 23;

class Options extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  handleThemePress = () => {
    console.log('press theme');
    const { navigation } = this.props;
    navigation.navigate('Themes')
  };

  handleSitePress = () => {
    Linking.openURL('https://fixer.io').catch(() => alert('error'));
  };

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          text="Themes"
          onPress={this.handleThemePress}
          customIcon={
            <Icon name="rocket" size={ICON_SIZE} color={ICON_COLOR} />
          }
        />
        <Separator />
        <ListItem
          text="Fixer.io"
          onPress={this.handleSitePress}
          customIcon={<Icon name="rocket" size={30} color="#900" />}
        />
      </ScrollView>
    );
  }
}

export default Options;
