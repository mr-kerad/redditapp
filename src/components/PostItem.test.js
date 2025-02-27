import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PostItem from './PostItem';

describe('PostItem', () => {
  const post = {
    id: '1',
    title: 'Test Post',
    content: 'Test Content',
    category: 'test',
    image: 'https://example.com/image.jpg',
  };

  test('renders title and Read More link', () => {
    render(
      <BrowserRouter>
        <PostItem post={post} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Read More')).toHaveAttribute('href', '/post/1');
  });

  test('displays image when provided', () => {
    render(
      <BrowserRouter>
        <PostItem post={post} />
      </BrowserRouter>
    );
    const img = screen.getByRole('img', { name: 'Test Post' });
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('shows placeholder on image error', () => {
    render(
      <BrowserRouter>
        <PostItem post={{ ...post, image: 'invalid-url' }} />
      </BrowserRouter>
    );
    const img = screen.getByRole('img', { name: 'Test Post' });
    fireEvent.error(img);
    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument();
  });
});