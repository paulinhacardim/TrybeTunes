import React from 'react';
import PropTypes from 'prop-types';
// Questão 7 //
class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl
    } = this.props;

    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src="{previewUrl}" controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>

      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
