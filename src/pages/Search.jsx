import React from 'react';
import Header from '../components/Header';
import Loading from '../Loading';

class Search extends React.Component {
  state = ({
    loading: false,
    artista: '',
    isDisabled: true,

  });

  // Questão 5
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validaBotão);
  };

  // Questão 5 - Reutilizei a função dos botões do Requisito 2. Troquei user por artista
  validaBotão = () => {
    const { artista } = this.state;
    const minimo = 2;
    if (artista.length >= minimo) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  render() {
    const { loading, isDisabled } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-search">
        <h1>Pesquisar</h1>
        <Header />
        {/* Questão 5 */}
        Pesquisa Artista/Banda
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="artista"
            placeholder="Artista ou Banda"
            onChange={ this.handleChange }
          />

          <button
            data-testid="search-artist-button"
            type="button"
            className="btn btn-outline-danger"
            disabled={ isDisabled }
            onClick={ this.botaoClick }
          >
            {' '}
            Pesquisar
            {' '}

          </button>

        </form>
      </div>
    );
  }
}

export default Search;
