import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrenciesThunk } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { currencies } = this.props;

    return (
      <>
        <label htmlFor="expense">
          Valor:
          <input type="number" id="expense" data-testid="value-input" />
        </label>
        <label htmlFor="expenseDescription">
          Descrição:
          <input type="text" id="expenseDescription" data-testid="description-input" />
        </label>
        <select id="currency" data-testid="currency-input">
          {currencies.map((currency) => (
            <option key={ currency }>
              {currency}
            </option>
          ))}
        </select>
        <select id="paymentMethod" data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select id="tag" data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </>
    );
  }
}

WalletForm.propTypes = {
  getCurrencies: PropTypes.func,
  currencies: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrenciesThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
