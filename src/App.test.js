import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import postReducer from './redux/reducers/postReducer';

// Use Redux Toolkit's configureStore with postReducer
const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

test('renders app with search bar', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByPlaceholderText(/Search posts by title/i)).toBeInTheDocument();
});