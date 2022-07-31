import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  removeExpenseAction,
  editorModeAction,
} from '../redux/actions';

class Table extends Component {
  deleteExpense = (id) => {
    const { removeExpense } = this.props;
    removeExpense(id);
  }

  render() {
    const { expenses, editorMode, isEditorMode } = this.props;
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => {
              const exchange = Number(expense.exchangeRates[expense.currency].ask);
              const convertedValue = Number(
                expense.exchangeRates[expense.currency].ask * expense.value,
              );

              return (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>{exchange.toFixed(2)}</td>
                  <td>{convertedValue.toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteExpense(expense.id) }
                      disabled={ isEditorMode }
                    >
                      Excluir
                    </button>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      disabled={ isEditorMode }
                      onClick={ () => {
                        editorMode(expense.id);
                      } }
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  isEditorMode: state.wallet.editor,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(removeExpenseAction(id)),
  editorMode: (id) => dispatch(editorModeAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
