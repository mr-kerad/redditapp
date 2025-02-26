import React from 'react';

function PostDetail({ post }) {
  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      {post.image && (
        <img src={post.image} alt={post.title} className="post-image" />
      )}
      <div className="post-content">
        {post.content.startsWith('http') ? (
          <p>
            This post links to external content: <br />
            <a href={post.content} target="_blank" rel="noopener noreferrer">
              {post.content}
            </a>
          </p>
        ) : (
          <p>{post.content}</p>
        )}
      </div>
      <p><strong>Subreddit:</strong> {post.category}</p>
    </div>
  );
}

export default PostDetail;