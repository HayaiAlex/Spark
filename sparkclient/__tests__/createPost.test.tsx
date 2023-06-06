import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import React from "react";
import CreatePost from "../src/components/CreatePost";

import { ClerkProvider } from "@clerk/clerk-react";
const clerkPubKey =
  "pk_test_aW52aXRpbmctYmFybmFjbGUtMjUuY2xlcmsuYWNjb3VudHMuZGV2JA";

test("renders create post component", () => {
  render(
    <ClerkProvider publishableKey={clerkPubKey}>
      <CreatePost updatePosts={() => {}} />
    </ClerkProvider>
  );
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByText("😀")).toBeInTheDocument();
  expect(screen.getByText("Post")).toBeInTheDocument();
});

test("user can only add emoji to textbox", () => {
  const user = userEvent.setup();

  render(
    <ClerkProvider publishableKey={clerkPubKey}>
      <CreatePost updatePosts={() => {}} />
    </ClerkProvider>
  );
  const textbox = screen.getByRole("textbox");
  expect(textbox).toHaveValue("");

  // user can only add emoji to textbox
  userEvent.type(textbox, "hello");
  expect(textbox).toHaveValue("");

  userEvent.type(textbox, "😀");
  waitFor(() => expect(textbox).toHaveValue("😀"));
});
