import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <h1>Pesquisar</h1>
        <Header />
      </div>
    );
  }
}

export default Search;
