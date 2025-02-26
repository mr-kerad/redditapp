# RedditApp

A React and Redux application with a Node.js proxy server to browse and interact with Reddit posts from `r/all/hot`.

## Wireframes
- **Home Page**: Displays a grid of posts with titles, thumbnails (or grey placeholders), and "Read More" buttons. Features a search bar and filter panel above the list.
- **Detail Page**: Shows the selected post’s title, thumbnail (if available), and full content (text or external link).

*(Wireframes TBD: Sketch in Figma or upload hand-drawn images to this repo under `/docs/wireframes/`.)*

## Technologies Used
- **React**: UI components with React Router for navigation.
- **Redux**: State management with Redux Toolkit for fetching and filtering posts.
- **Node.js/Express**: Proxy server to handle Reddit API authentication and requests.
- **Axios**: HTTP requests to Reddit API via the proxy.
- **CSS**: Custom styles for a responsive, cohesive design.
- **Create React App**: Build tooling and development server.

## Features
- **Initial View**: Loads 10 recent posts from `r/all/hot` on startup with grey placeholders during fetch.
- **Search**: Filters posts by title as users type in the search bar.
- **Filter**: Narrows posts to predefined subreddits (e.g., "aviation", "news") via buttons.
- **Detailed View**: Displays full post content (text or link) on a new page when "Read More" is clicked.
- **Responsive Design**: Adapts from desktop to mobile with a grid layout.
- **Secure Credentials**: Uses `.env` files for Reddit API keys, excluded from Git.

## Setup
1. **Prerequisites**: Node.js and npm installed.
2. **Client**:
   - `cd redditapp`
   - `npm install`
   - `npm start` (runs on `http://localhost:3000`)
3. **Server**:
   - `cd server`
   - `npm install`
   - Create `server/.env` with:
     ```
     REDDIT_USERNAME=your_reddit_username
     REDDIT_PASSWORD=your_reddit_password
     REDDIT_CLIENT_ID=your_client_id
     REDDIT_CLIENT_SECRET=your_client_secret
     PORT=5000
     ```
   - `node index.js` (runs on `http://localhost:5000`)
4. Open `http://localhost:3000` in a browser.

## Future Work
- **Deployment**: Host on Netlify (client) and Heroku (server) for a public URL.
- **Testing**: Add Jest unit tests and Cypress E2E tests.
- **Animations**: Implement fade-in transitions for posts.
- **Error Handling**: Add UI to recover from API fetch errors (e.g., retry button).
- **Enhanced Features**: Fetch more posts on scroll, embed video players for `v.redd.it` links.