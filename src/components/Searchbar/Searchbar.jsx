import React, { Component } from 'react';
import { StyledSearchBar } from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    searchText: '',
  };

  handleChange = evt => {
    this.setState({ searchText: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchText.trim() === '') {
      alert('The search field is empty');
      return;
    }
    this.props.onSubmit(this.state.searchText);
  };

  render() {
    return (
      <StyledSearchBar className="searchbar">
        <form onSubmit={this.handleSubmit} className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchText}
            onChange={this.handleChange}
          />
        </form>
      </StyledSearchBar>
    );
  }
}
