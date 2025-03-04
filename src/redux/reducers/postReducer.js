import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://www.reddit.com/r/all/hot.json?limit=10');
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data.children.map((child) => {
    const data = child.data;
    let image = null;

    console.log(`Post: ${data.title}`);
    console.log('Preview:', data.preview?.images?.[0]?.source?.url || 'None');
    console.log('URL:', data.url || 'None');
    console.log('Thumbnail:', data.thumbnail || 'None');

    if (data.url && data.url.match(/\.(jpeg|jpg|png|gif)$/)) {
      image = data.url;
    } else if (
      data.thumbnail &&
      data.thumbnail.includes('thumbs.redditmedia.com') &&
      data.thumbnail !== 'self' &&
      data.thumbnail !== 'default' &&
      data.thumbnail !== 'nsfw'
    ) {
      image = data.thumbnail;
    }

    console.log('Selected Image:', image || 'None');

    return {
      id: data.id,
      title: data.title,
      summary: data.selftext || 'No summary',
      content: data.selftext || data.url,
      category: data.subreddit,
      image,
    };
  });
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