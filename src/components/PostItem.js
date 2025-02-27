import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PostItem({ post }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="post-item">
      <h3>{post.title}</h3>
      {post.image && !imageError ? (
        <img 
          src={post.image} 
          alt={post.title} 
          className="post-image" 
          onError={() => {
            console.log(`Image failed to load for ${post.title}: ${post.image}`);
            setImageError(true);
          }}
        />
      ) : (
        <div className="image-placeholder" />
      )}
      <Link to={`/post/${post.id}`} className="read-more-btn">
        Read More ...
      </Link>
    </div>
  );
}

export default PostItem;