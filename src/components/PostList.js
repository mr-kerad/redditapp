import React from 'react';
import { useSelector } from 'react-redux';
import PostItem from './PostItem';

function PostList() {
  const { filteredPosts, isLoading } = useSelector((state) => state.posts);

  if (isLoading) {
    return (
      <div className="post-list">
        {Array(10)
          .fill()
          .map((_, index) => (
            <div key={index} className="post-item">
              <div className="placeholder-title" /> {/* Changed from <h3> */}
              <div className="image-placeholder" />
              <div className="placeholder-button" />
            </div>
          ))}
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