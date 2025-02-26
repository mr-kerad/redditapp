# RedditApp

A React/Redux application to browse and interact with Reddit posts.

## Wireframes
- **Home Page**: Displays a list of posts with titles, thumbnails (or placeholders), and "Read More" buttons, plus a search bar and filter panel.
- **Detail Page**: Shows the selected post’s title, image (if available), and content (text or link).

(Sketch these in a tool like Figma or link to hand-drawn images hosted online.)

## Technologies Used
- **React**: Frontend framework for UI components.
- **Redux**: State management with Redux Toolkit for fetching and filtering posts.
- **React Router**: Navigation between home and detail pages.
- **Axios**: HTTP requests to Reddit API.
- **CSS**: Custom styles for a cohesive design.
- **Create React App**: Build tooling.

## Features
- Fetch and display recent posts from `r/all/hot`.
- Search posts by title.
- Filter posts by predefined subreddits (e.g., "aviation", "news").
- View detailed post content (text or external link) on a new page.
- Responsive design with grey placeholders during loading.

## Future Work
- Add animations/transitions (e.g., fade-in posts).
- Implement unit and end-to-end tests.
- Fetch more posts or search Reddit directly via API.
- Add error handling UI (e.g., retry button).
- Embed video players for `v.redd.it` links.