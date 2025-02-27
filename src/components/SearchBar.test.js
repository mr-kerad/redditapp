import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SearchBar from './SearchBar';
import { searchPosts } from '../redux/reducers/postReducer';

const mockStore = configureStore([]);

describe('SearchBar', () => {
  test('renders input and updates on change', () => {
    const store = mockStore({});
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search posts by title...');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
    expect(store.dispatch).toHaveBeenCalledWith(searchPosts('test'));
  });
});