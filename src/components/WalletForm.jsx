import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getCurrenciesNameThunk,
  getCurrenciesObjThunk,
  updateExpensesAction,
  editorModeAction,
} from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  /*   componentDidUpdate() {
    const { isEditing } = this.props;
    if (isEditing) this.expenseInfoOnInputs();
  } */

  handleChange = ({ target }) => {
    const { id } = target;
    this.setState({
      [id]: target.value,
    });
  }

  saveExpense = () => {
    const { value, description, currency, method, tag } = this.state;
    const { currentId, saveExpenseOnStore } = this.props;

    const expenseInfo = {
      id: currentId,
      value,
      description,
      currency,
      method,
      tag,
    };
    saveExpenseOnStore(expenseInfo);
    this.setState({
      value: '',
      description: '',
    });
  }

  updateExpenses = () => {
    const { expenses, idToEdit, updateExpensesOnStore, editorMode } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === idToEdit) {
        expense.value = value;
        expense.description = description;
        expense.currency = currency;
        expense.method = method;
        expense.tag = tag;
      }
      return expense;
    });

    updateExpensesOnStore(updatedExpenses);
    editorMode();
  }

  // funcionalidade para preencher o input automaticamente ao clicar em editar
  /*   expenseInfoOnInputs = () => {
    const { value } = this.state;
    if (value === '') {
      const { expenses, idToEdit } = this.props;
      const expenseObj = expenses.find((expense) => expense.id === idToEdit);
      this.setState({
        value: expenseObj.value,
        description: expenseObj.description,
        currency: expenseObj.currency,
        method: expenseObj.method,
        tag: expenseObj.tag,
      });
    }
  } */

  render() {
    const { currencies, isEditing } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            id="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <select
          id="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((currencyOpt) => (
            <option key={ currencyOpt }>
              {currencyOpt}
            </option>
          ))}
        </select>
        <select
          id="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          id="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        { isEditing ? (
          <button type="button" onClick={ this.updateExpenses }>Editar despesa</button>
        ) : (
          <button type="button" onClick={ this.saveExpense }>Adicionar despesa</button>
        ) }
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
  currentId: state.wallet.currentId,
  isEditing: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesNameThunk()),
  saveExpenseOnStore: (expenseInfo) => dispatch(getCurrenciesObjThunk(expenseInfo)),
  updateExpensesOnStore: (expenses) => dispatch(updateExpensesAction(expenses)),
  editorMode: () => dispatch(editorModeAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
