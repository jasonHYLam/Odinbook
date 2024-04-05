import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { Homepage } from "./components/homepage/Homepage.jsx";
import { CreatePost } from "./components/homepage/createPost/CreatePost.jsx";
import { Feed } from "./components/homepage/feed/Feed.jsx";
import { Post } from "./components/homepage/post/Post.jsx";
import { PersonalProfile } from "./components/homepage/personalProfile/PersonalProfile.jsx";
import { SearchAddUsers } from "./components/homepage/searchAddUsers/SearchAddUsers.jsx";
import { UserProfile } from "./components/homepage/userProfile/UserProfile.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Homepage />,
        children: [
          { path: "/", element: <Feed /> },
          { path: "/create_post", element: <CreatePost /> },
          { path: "/me", element: <PersonalProfile /> },
          { path: "/search_users", element: <SearchAddUsers /> },
          { path: "/users/:userID", element: <UserProfile /> },
          { path: "/posts/:postID", element: <Post /> },
        ],
      },
      // {path: "signup"}
    ],
  },
  // login
  //signup
  //home (feed)
  // addfriend
  // createPost
  // viewOwnProfile
  // view other profile
  // view post
  // logout
  // {}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
