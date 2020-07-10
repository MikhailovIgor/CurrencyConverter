import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, StatusBar} from 'react-native';
import { connect } from 'react-redux';

import {ListItem, Separator} from '../components/List';
import currencies from '../data/currencies';
import { changeBaseCurrency, changeQuoteCurrency} from '../actions/currencies';

class CurrencyList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
  };

    handlePress = (currency) => {
        const { route, navigation, dispatch } = this.props;
        const { type } = route.params;

        if (type === 'base') {
            dispatch(changeBaseCurrency(currency));
        } else if (type === 'quote') {
            dispatch(changeQuoteCurrency(currency));
        }

        navigation.goBack('null');
    };

  render() {
      const { route } = this.props;
      const { type } = route.params;
      const { baseCurrency, quoteCurrency } = this.props;

      let comparisonCurrency = baseCurrency;
      if( type === 'quote') {
          comparisonCurrency = quoteCurrency;
      }

    return (
      <View style={{flex: 1}}>
        <StatusBar translucent={false} barStyle="default" />
        <FlatList
          data={currencies}
          renderItem={({item}) => (
            <ListItem
              text={item}
              selected={item === comparisonCurrency}
              onPress={() => this.handlePress(item)}
              iconBackground={this.props.primaryColor}
            />
          )}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
        baseCurrency: state.currencies.baseCurrency,
        quoteCurrency: state.currencies.quoteCurrency,
        primaryColor: state.theme.primaryColor,
});

export default connect(mapStateToProps)(CurrencyList);
