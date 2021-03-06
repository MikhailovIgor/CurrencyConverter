import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StatusBar, KeyboardAvoidingView} from 'react-native';
import { connect } from 'react-redux';

import Container from '../components/Container/Container';
import {Logo} from '../components/Logo';
import InputWithButton from '../components/TextInput';
import ClearButton from '../components/Button/ClearButton';
import LastConverted from '../components/Text/LastConverted';
import Header from '../components/Header';

import { swapCurrency, changeCurrencyAmount } from '../actions/currencies';

const TEMP_CONVERSION_DATE = new Date();

class Home extends Component {

    static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    isFetching: PropTypes.bool,
    lastConvertedDate: PropTypes.object,
        primaryColor: PropTypes.string,
  };

  handlePressBaseCurrency = () => {
    const { navigation } = this.props;
    navigation.navigate('CurrencyList', {title: 'Base Currency', type: 'base'});
  };

  handlePressQuoteCurrency = () => {
    const { navigation } = this.props;
    navigation.navigate('CurrencyList', {title: 'Quote Currency', type: 'quote'});
  };

  handleTextChange = (amount) => {
    const { dispatch } = this.props;
    dispatch(changeCurrencyAmount(amount));
  };

  handleSwapCurrency = () => {
    console.log('press swap currency');
    this.props.dispatch(swapCurrency());
  };

  handleOptionsPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Options');
  };

render() {
    let quotePrice = '...';
    if (!this.props.isFetching) {
        quotePrice = (this.props.amount *  this.props.conversionRate).toFixed(2);
    }

    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar backgroundColor={this.props.primaryColor} translucent={false} barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="padding">
          <Logo tintColor={this.props.primaryColor} />
          <InputWithButton
            buttonText={this.props.baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={this.props.amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
            textColor={this.props.primaryColor}
          />
          <InputWithButton
            buttonText={this.props.quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            editable={false}
            value={quotePrice}
            textColor={this.props.primaryColor}
          />
          <LastConverted
            base={this.props.baseCurrency}
            quote={this.props.quoteCurrency}
            date={TEMP_CONVERSION_DATE}
            conversionRate={this.props.conversionRate}
          />
          <ClearButton
            text="Reverse Currencies"
            onPress={this.handleSwapCurrency}
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};

  return {
    baseCurrency,
    quoteCurrency,
    amount: state.currencies.amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching: conversionSelector.isFetching,
    lastConvertedDate: conversionSelector.date ? new Date
    (conversionSelector.date) : new Date(),
      primaryColor: state.theme.primaryColor,
  }
}

export default connect(mapStateToProps)(Home);
