import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/reducers/postReducer';
import PostItem from './PostItem';

function PostList() {
  const { filteredPosts, isLoading, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <div className="post-list">
        {Array(10)
          .fill()
          .map((_, index) => (
            <div key={index} className="post-item">
              <div className="placeholder-title" />
              <div className="image-placeholder" />
              <div className="placeholder-button" />
            </div>
          ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Oops! Something went wrong: {error}</p>
        <button onClick={() => dispatch(fetchPosts())}>Retry</button>
      </div>
    );
  }

  return (
    <div className="post-list">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <p>No posts match your search.</p>
      )}
    </div>
  );
}

export default PostList;