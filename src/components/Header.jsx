import React from 'react';
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
      </header>
    );
  }
}
export default Header;
