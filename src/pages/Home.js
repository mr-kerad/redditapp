import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/reducers/postReducer';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import PostList from '../components/PostList';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="home">
      <SearchBar />
      <FilterPanel />
      <PostList />
    </div>
  );
}

export default Home;