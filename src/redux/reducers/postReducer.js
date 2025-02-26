import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('http://localhost:5000/api/reddit/posts');
  return response.data;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    allPosts: [],
    filteredPosts: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    searchPosts(state, action) {
      const term = action.payload.toLowerCase();
      state.filteredPosts = term
        ? state.allPosts.filter((post) =>
            post.title.toLowerCase().includes(term)
          )
        : state.allPosts;
    },
    filterPosts(state, action) {
      const category = action.payload;
      state.filteredPosts = category
        ? state.allPosts.filter((post) => post.category === category)
        : state.allPosts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allPosts = action.payload;
        state.filteredPosts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { searchPosts, filterPosts } = postSlice.actions;
export default postSlice.reducer;