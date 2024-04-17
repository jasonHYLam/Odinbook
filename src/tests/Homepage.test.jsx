import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Route, RouterProvider } from "react-router-dom";

import { Homepage } from "../components/homepage/Homepage";
import { Login } from "../components/loginSignup/Login";
import { Feed } from "../components/homepage/feed/Feed";
import { RenderRouteWithOutletContext } from "./RenderRouteWithOutletContext";

describe("something", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });
  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("App", () => {
  it("renders initial homepage", () => {
    const routes = [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    const loading = screen.getByRole("paragraph");
    expect(loading.textContent).toBe("loading");

    // const form = screen.getByRole("form");
    // const usernameInput = form.getByRole("username");
    // expect(usernameInput).toBe("");

    // screen.debug();
  });
});

// describe("Feed", () => {
//   const feed = [
//     {
//       //post
//       author: { username: "RiverEuphrates" },
//       text: "Ride a tire",
//     },
//   ];
//   const routes = [
//     {
//       path: "/",
//       element: <RenderRouteWithOutletContext context={feed} />,
//       children: [
//         {
//           path: "/",
//           element: <Feed />,
//         },
//       ],
//     },
//   ];
//   const router = createMemoryRouter(routes, {
//     initialEntries: ["/"],
//   });
//   render(<RouterProvider router={router} />);
// });
