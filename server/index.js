const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // For explicit .env path

// Load environment variables from explicit path
const dotenvResult = dotenv.config({ path: path.resolve(__dirname, '.env') });
if (dotenvResult.error) {
  console.error('Error loading .env:', dotenvResult.error);
} else {
  console.log('Loaded .env successfully');
  console.log('Parsed .env:', dotenvResult.parsed); // Show what was loaded
  console.log('Username:', process.env.REDDIT_USERNAME || 'Not set');
  console.log('Password:', process.env.REDDIT_PASSWORD || 'Not set');
  console.log('Client ID:', process.env.REDDIT_CLIENT_ID || 'Not set');
  console.log('Client Secret:', process.env.REDDIT_CLIENT_SECRET || 'Not set');
}

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/api/reddit/posts', async (req, res) => {
  try {
    console.log('Making request with:');
    console.log('Username:', process.env.REDDIT_USERNAME);
    console.log('Password:', process.env.REDDIT_PASSWORD);
    console.log('Client ID:', process.env.REDDIT_CLIENT_ID);
    console.log('Client Secret:', process.env.REDDIT_CLIENT_SECRET);

    const authResponse = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      `grant_type=password&username=${process.env.REDDIT_USERNAME}&password=${process.env.REDDIT_PASSWORD}`,
      {
        auth: {
          username: process.env.REDDIT_CLIENT_ID,
          password: process.env.REDDIT_CLIENT_SECRET,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': `MyRedditApp/0.1 by ${process.env.REDDIT_USERNAME}`,
        },
      }
    );

    const token = authResponse.data.access_token;

    const postsResponse = await axios.get('https://oauth.reddit.com/r/all/hot', {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': `MyRedditApp/0.1 by ${process.env.REDDIT_USERNAME}`,
      },
      params: { limit: 10 },
    });

    res.json(postsResponse.data.data.children.map((child) => {
      const data = child.data;
      let image = null;

      if (data.thumbnail && data.thumbnail !== 'self' && data.thumbnail !== 'default' && data.thumbnail !== 'nsfw') {
        image = data.thumbnail;
      } else if (data.is_video && data.preview?.images?.[0]?.source?.url) {
        image = data.preview.images[0].source.url.replace(/&/g, '&');
      } else if (data.url && data.url.match(/\.(jpeg|jpg|png|gif)$/)) {
        image = data.url;
      }

      return {
        id: data.id,
        title: data.title,
        summary: data.selftext || 'No summary',
        content: data.selftext || data.url,
        category: data.subreddit,
        image,
      };
    }));
  } catch (error) {
    console.error('Error fetching Reddit posts:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));