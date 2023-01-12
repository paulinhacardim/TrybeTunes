import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../Loading';
// Questão 7
class MusicCard extends React.Component {
  state = ({
    loading: false,
    musicFavorite: false,

  });

  result = async ({ target: { checked } }) => {
    const { music } = this.props;
    this.setState({
      loading: true,
    });

    if (checked) {
      await addSong(music);
    } else {
      removeSong(music);
    }
    this.setState({
      loading: false,
      musicFavorite: checked,

    });
  };

  render() {
    const { music: { previewUrl, trackName, trackId } } = this.props;
    const { loading, musicFavorite } = this.state;
    if (loading) return <Loading />;

    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ trackId }
        >
          Favorita
          <input
            type="checkbox"
            name="muscicFavorite"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.result }
            checked={ musicFavorite }
          />
        </label>

        <div>
          { loading && <Loading /> }
        </div>
      </div>

    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }),
}.isRequired;

export default MusicCard;
