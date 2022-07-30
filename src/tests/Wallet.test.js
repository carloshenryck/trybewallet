import React from "react";
import { screen } from '@testing-library/react';

import Wallet from '../pages/Wallet';

import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Página carteira', () => {
  it('verifica se o email, valor e moeda está na tela', () => {
    const initialStateMock = {
      user: {
        email: 'emailvalido@gmail.com',
      }
    }

    renderWithRouterAndRedux(<Wallet />, {
      initialState: initialStateMock
    });

    const currency = screen.getByTestId('header-currency-field');
    const email = screen.getByTestId('email-field');

    expect(screen.getByTestId('total-field')).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(email.innerHTML).toBe('emailvalido@gmail.com');
    expect(currency).toBeInTheDocument();
    expect(currency.innerHTML).toBe('BRL');
  });

  it('verifica se os inputs para adicionar uma despesa está na tela ', () => {
    renderWithRouterAndRedux(<Wallet />);

    expect(screen.getByTestId('value-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
  });
});