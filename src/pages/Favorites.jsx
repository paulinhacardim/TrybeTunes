import React from 'react';
import Header from '../components/Header';
import Loading from '../Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  state = {
    musicFavorites: [],
    loading: false,

  };

  componentDidMount() {
    this.setState({
      loading: true,

    }, async () => {
      const musicFavorites = await getFavoriteSongs();
      this.setState({
        musicFavorites,
        loading: false,
      });
    });
  }

  render() {
    const { musicFavorites, loading } = this.state;
    console.log(musicFavorites);
    return (
      <div data-testid="page-favorites">
        <h1>Favoritos</h1>
        <Header />
        { loading ? <Loading /> : musicFavorites.map((music) => (
          <MusicCard music={ music } key={ music.trackName } />
        ))}
        ;

      </div>
    );
  }
}

export default Favorites;
