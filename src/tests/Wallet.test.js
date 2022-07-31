import React from "react";
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import Wallet from '../pages/Wallet';

import mockData from './helpers/mockData';

import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Página carteira', () => {
  afterEach(() => jest.clearAllMocks());

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
    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
  });

  it('verifica se ao adicionar uma despesa, o header é atualizado e adicionado a tabela', async () => {
    const data = mockData;
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    })

    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const addButton = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(value, '2');
    userEvent.type(description, 'teste');
    userEvent.click(addButton);
    
    await screen.findAllByText('9.51');
    expect(screen.getByTestId('total-field').innerHTML).toBe('9.51');

    expect(screen.getByRole('cell', { name: 'teste' }));
    expect(screen.getByRole('cell', { name: '9.51' }));
  });

  it('verifca se ao remover a despesa o header e a tabela é atualizado', async () => {
    const data = mockData;
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    })

    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const addButton = screen.getByRole('button', { name: 'Adicionar despesa' });
    
    userEvent.type(value, '2');
    userEvent.type(description, 'teste');
    userEvent.click(addButton);
    
    await screen.findAllByText('9.51');

    const deleteButton = screen.getByTestId('delete-btn');
    userEvent.click(deleteButton);

   const text = await screen.queryByText('9.51');
   expect(text).toBeNull();
  })

  it('verifica se a edição atualiza a tabela  e o header', async () => {
    const data = mockData;
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    })

    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const addButton = screen.getByRole('button', { name: 'Adicionar despesa' });
    
    userEvent.type(value, '2');
    userEvent.type(description, 'teste');
    userEvent.click(addButton);
    
    await screen.findAllByText('9.51');

    const editButton = screen.getByTestId('edit-btn');
    userEvent.click(editButton);
    const saveEditButton = screen.getByRole('button', { name: 'Editar despesa' });
    userEvent.click(saveEditButton);

   const text = await screen.queryByText('9.51');
   expect(text).toBeNull();
  })
});