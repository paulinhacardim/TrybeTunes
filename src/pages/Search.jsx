import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = ({
    loading: false,
    artista: '',
    isDisabled: true,
    // Questão 6
    ArtistList: '',
    resultadoApi: '',

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

  // Questao 6
  botãoPesquisar = async () => {
    const { artista } = this.state;
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(artista);
    this.setState({
      loading: false,
      artista: '',
      ArtistList: artista,
      resultadoApi: response,
    });
  };

  render() {
    const {
      loading,
      isDisabled,
      ArtistList,
      resultadoApi,
    } = this.state;
    if (loading) return <Loading />;
    return (
      <>
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
              // onClick={ this.botaoClick }
              onClick={ this.botãoPesquisar }
            >
              {' '}
              Pesquisar
              {' '}

            </button>

          </form>
        </div>
        {/* Questão 6 */}
        <div>
          { resultadoApi.length === 0 ? (
            <h2>Nenhum álbum foi encontrado</h2>)
            : (
              <div>
                {`Resultado de álbuns de: ${ArtistList}`}
                { resultadoApi.map((album) => (
                  <div key={ album.collectionId }>
                    <h3>{album.collectionName}</h3>
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />

                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      {' '}
                      Acesse
                      {' '}

                    </Link>

                  </div>
                ))}
              </div>
            )}
        </div>
      </>
    );
  }
}

export default Search;
