import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isDisabled: true,
      loading: false,
    };
  }

  botaoClick = () => {
    const { history } = this.props;
    const { user } = this.state;
    console.log(this.props);
    console.log(user);
    this.setState(
      { loading: true },
      () => {
        createUser({ name: user }).then(() => {
          history.push('/search');
        });
      },

    );
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validaBotão);
  };

  validaBotão = () => {
    const { user } = this.state;
    const minimo = 3;
    if (user.length >= minimo) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  render() {
    const { isDisabled, loading } = this.state;

    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <>
            Name
            <form>
              <input
                data-testid="login-name-input"
                type="text"
                name="user"
                placeholder="Digite seu nome"
                onChange={ this.handleChange }
              />

              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ isDisabled }
                onClick={ this.botaoClick }
              >
                {' '}
                Entrar
                {' '}

              </button>

            </form>
          </>
        )}
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
