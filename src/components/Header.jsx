import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../Loading';

class Header extends React.Component {
  state = {
    loading: false,
    user: '',

  };

  componentDidMount() {
    this.pessoaLogada();
  }

  pessoaLogada = async () => {
    this.setState({ loading: true });
    const salvaDados = await getUser();
    this.setState({
      loading: false,
      user: salvaDados.name,
    });
  };

  render() {
    const { loading, user } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">{ user }</h2>
        <nav>
          <Link data-testid="link-to-search" to="/search"> Search </Link>
          <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
          <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
        </nav>
      </header>
    );
  }
}
export default Header;
