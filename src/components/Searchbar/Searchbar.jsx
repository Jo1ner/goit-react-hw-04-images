import { useState } from 'react';
import { StyledSearchBar } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = evt => {
    setSearchText(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (searchText.trim() === '') {
      alert('The search field is empty');
      return;
    }
    onSubmit(searchText);
  };

  return (
    <StyledSearchBar className="searchbar">
      <form onSubmit={handleSubmit} className="form">
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchText}
          onChange={handleChange}
        />
      </form>
    </StyledSearchBar>
  );
};
