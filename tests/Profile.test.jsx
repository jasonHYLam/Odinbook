import { describe, it, expect, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { createMemoryRouter, Route, RouterProvider } from "react-router-dom";
import { PersonalProfile } from "../src/components/homepage/personalProfile/PersonalProfile";
import { RenderRouteWithOutletContext } from "./RenderRouteWithOutletContext";
import { beforeEach, vi } from "vitest";
import * as helpers from "../src/helper/helperUtils";

describe("personal profile", () => {
  beforeEach(() => {
    // Mock Fetch Attempt 1

    // global.fetch = vi.fn();
    // fetch.mockResolvedValue(() => {
    //   const getUserPostsResponse = {
    //     json: () => new Promise((resolve) => resolve({ posts: [] })),
    //   };

    //   return getUserPostsResponse;
    // });

    // Mock Fetch Attempt 2

    vi.spyOn(helpers, "fetchData").mockResolvedValue(() => {
      const getUserPostsResponse = new Response(JSON.stringify({ posts: [] }), {
        status: 201,
      });
      // const getUserPostsResponse = {
      //   json: () => new Promise((resolve) => resolve({ posts: [] })),
      // };

      return getUserPostsResponse;
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("loads settings dialog when clicked", async () => {
    const loggedInUser = {};
    const likedPosts = [];
    const routes = [
      {
        path: "/",
        element: (
          <RenderRouteWithOutletContext
            context={{ loggedInUser, likedPosts }}
          />
        ),
        children: [{ path: "/me", element: <PersonalProfile /> }],
      },
    ];
    const router = createMemoryRouter(routes, { initialEntries: ["/me"] });
    render(<RouterProvider router={router} />);

    // await waitFor(() => {
    //   screen.getByRole("span", { name: "settings" });
    // });

    expect(screen.getByRole("span", { name: "settings" })).toBeInTheDocument();
  });
});
