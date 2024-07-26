# Tabasco

[Live link](https://tabasco.netlify.app/)
[Backend repo](https://github.com/jasonHYLam/Odinbook-Server/tree/main)

![tabasco2](https://github.com/user-attachments/assets/8e2178ee-9f8a-4aa7-b1f8-83ea8aff15d9)

This is a fullstack social media web application, based on Twitter and Pixiv. I wanted to create a platform that artists could use to post their artwork and view other works.

The frontend was created using ReactJS and JavaScript. I am currently migrating the codebase to TypeScript. Other essential technologies include React-Router, React-Hook-Form and React-Select. The backend technologies used are NodeJS, Express, MongoDB for persistent storage of user data, Multer and Cloudinary for image uploading and storage respectively, PassportJS for authentication and authorization, BcryptJS for password hashing, and Sharp for image modification for thumbnail creation.

## Usage:

Users are expected to login before being able to access the rest of the site. A guest account is provided for quick access, however certain features like changing user settings are disabled.

After logging in, the home page displays their feed of other people's works.

The header contains a New Post feature and Search users feature.

When the user clicks on New Post, they are prompted to create a new post, with an image and title being required. Optionally, hashtags are able to be added or created. An optional description is able to be provided, with a maximum character count.

Users can view posts by clicking on the corresponding image or title link. Each post has a corresponding number of likes and bookmarks. Users can leave comments, like posts and bookmark posts. They can edit and delete their own comments, as well as own posts' descriptions and titles.

When the user begins typing in the Search users typebar, the relevant users with usernames matching the user's search query are displayed, allowing the user to click on their profile. On other users' profiles, their posts are displayed, as well as a follow/unfollow button.

The user's own profile has many features, including the ability to change their settings, view followers and followed users, own posts, liked posts and bookmarked posts, as well as logging out.

## Features:

- Image uploads
- Creating posts
- Adding hashtags
- Guest login
- Simulated real-time updates
- Following users
- Adding comments
- Liking + bookmarking posts
- Testing with Vitest

![tabasco3](https://github.com/user-attachments/assets/8f3e1699-b907-45b2-9c2c-d4fa21f3bf9e)
