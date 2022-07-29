import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userInfoAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  validateEmail = (email) => {
    const validEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return email.match(validEmail);
  }

  verifyPassword = () => {
    const { email, password } = this.state;
    const minPasswordLength = 6;

    if (password.length >= minPasswordLength && this.validateEmail(email)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleInputChange = ({ target }) => {
    const { id } = target;
    this.setState({
      [id]: target.value,
    }, () => this.verifyPassword());
  }

  render() {
    const { email, password, isDisabled } = this.state;
    const { saveInfo, history } = this.props;

    return (
      <>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleInputChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="text"
            id="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleInputChange }
          />
        </label>
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ () => {
            saveInfo(email);
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </>
    );
  }
}

Login.propTypes = {
  saveInfo: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveInfo: (email) => dispatch(userInfoAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
