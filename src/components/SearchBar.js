import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPosts } from '../redux/reducers/postReducer';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    dispatch(searchPosts(term));
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search posts by title..."
      className="search-bar"
    />
  );
}

export default SearchBar;