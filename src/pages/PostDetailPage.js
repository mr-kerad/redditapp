import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostDetail from '../components/PostDetail';

function PostDetailPage() {
  const { id } = useParams();
  const post = useSelector((state) =>
    state.posts.allPosts.find((p) => p.id === id)
  );

  return (
    <div className="post-detail-page">
      {post ? <PostDetail post={post} /> : <p>Post not found</p>}
    </div>
  );
}

export default PostDetailPage;