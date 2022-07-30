import React from "react";
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"; 

import App from '../App';

import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Página de login', () => {
  it('verifica se os inputs de email e senha estão na tela', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha:')).toBeInTheDocument();
  })

  it('verifica se o botão só é habilitado quando os inputs estão corretos', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByLabelText('Email:');
    const password = screen.getByLabelText('Senha:');
    const button = screen.getByRole('button', { name: 'Entrar'});

    userEvent.type(email, 'emailInvalido@');    
    expect(button).toHaveProperty('disabled', true);
    userEvent.type(password, '3245');    
    expect(button).toHaveProperty('disabled', true);
    userEvent.type(email, 'emailvalido@gmail.com');
    expect(button).toHaveProperty('disabled', true);
    userEvent.type(password, '123456');
    expect(button).toHaveProperty('disabled', false);
  })

  it('verifica se o botão redireciona para a página /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByLabelText('Email:');
    const password = screen.getByLabelText('Senha:');
    const button = screen.getByRole('button', { name: 'Entrar'});

    userEvent.type(email, 'emailvalido@gmail.com');
    userEvent.type(password, '123456');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});