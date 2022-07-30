export const SAVE_INFORMATIONS = 'SAVE_INFORMATIONS';
export const SAVE_CURRENCIES_NAME = 'SAVE_CURRENCIES_NAME';
export const SAVE_CURRENCIES_OBJ = 'SAVE_CURRENCIES_OBJ';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const userInfoAction = (email) => ({
  type: SAVE_INFORMATIONS,
  info: {
    email,
  },
});

export const currenciesNameAction = (currencies) => ({
  type: SAVE_CURRENCIES_NAME,
  currencies,
});

export const currenciesObjAction = (currencies) => ({
  type: SAVE_CURRENCIES_OBJ,
  currencies,
});

export const removeExpenseAction = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

export const getCurrenciesNameThunk = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currenciesArr = Object.keys(data).filter((currency) => currency !== 'USDT');
  dispatch(currenciesNameAction(currenciesArr));
};

export const getCurrenciesObjThunk = (expenseInfo) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();

  delete data.USDT;
  expenseInfo.exchangeRates = data;
  dispatch(currenciesObjAction(expenseInfo));
};
