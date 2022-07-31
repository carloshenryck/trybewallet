import {
  SAVE_CURRENCIES_NAME,
  SAVE_EXPENSE,
  REMOVE_EXPENSE,
  UPDATE_EXPENSES,
  EDITOR_MODE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  currentId: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES_NAME:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.currencies],
      currentId: state.currentId + 1,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EDITOR_MODE:
    return {
      ...state,
      editor: !state.editor,
      idToEdit: action.id,
    };
  default:
    return state;
  }
};

export default walletReducer;
