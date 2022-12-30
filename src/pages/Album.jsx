import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
// Questão 7 //
class Album extends React.Component {
  state = ({
    album: '',
    name: '',
    music: [],
  });

  componentDidMount() {
    this.response();
  }

  response = async () => {
    const { match: { params: { id } } } = this.props;
    const total = await getMusics(id);
    this.setState({
      album: total[0].collectionName,
      name: total[0].artistName,
      music: total.slice(1),
    });
  };

  render() {
    const {
      album,
      name,
      music,
    } = this.state;
    return (
      <div data-testid="page-album">
        <h1>Album</h1>
        <Header />

        <p data-testid="artist-name">
          {' '}
          { name }
        </p>
        <p data-testid="album-name">
          {' '}
          { album }
        </p>

        {music.length !== 0 && (music.map((music1) => (
          <MusicCard
            key={ music1.trackName }
            trackName={ music1.trackName }
            previewUrl={ music1.previewUrl }
          />

        ))) }

      </div>
    );
  }
}

Album.propTypes = {
  new: PropTypes.shape({
    parametro: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
