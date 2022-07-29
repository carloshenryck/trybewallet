export const SAVE_INFORMATIONS = 'SAVE_INFORMATIONS';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

export const userInfoAction = (email) => ({
  type: SAVE_INFORMATIONS,
  info: {
    email,
  },
});

export const currenciesAction = (currencies) => ({
  type: SAVE_CURRENCIES,
  currencies,
});

export const fetchCurrenciesThunk = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currenciesArr = Object.keys(data).filter((currency) => currency !== 'USDT');
  dispatch(currenciesAction(currenciesArr));
};
