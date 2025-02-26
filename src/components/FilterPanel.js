import React from 'react';
import { useDispatch } from 'react-redux';
import { filterPosts } from '../redux/reducers/postReducer';
import { CATEGORIES } from '../constants';

function FilterPanel() {
  const dispatch = useDispatch();

  const handleFilter = (category) => {
    dispatch(filterPosts(category));
  };

  const resetFilter = () => {
    dispatch(filterPosts('')); // Reset to show all posts
  };

  return (
    <div className="filter-panel">
      <button onClick={resetFilter} className="filter-button all-button">
        All
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => handleFilter(category)}
          className="filter-button"
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default FilterPanel;