import React, { useEffect, useState } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";

// Utils
import endpoints from "./lib/api";
import type { Post } from "./lib/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Components
import { FaLinkedin, FaGithub, FaWindows } from "react-icons/fa";
import CreatePost from "./components/CreatePost";

dayjs.extend(relativeTime);

export default function App() {
  const { isLoaded, isSignedIn, user } = useUser();

  // State
  const [posts, setPosts] = useState<Post[]>([]);

  const updatePosts = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  const getPosts = async () => {
    try {
      const response = await fetch(endpoints.getAllPosts);
      const data = await response.json();

      // convert c# date string to js date
      data.forEach((post: Post) => {
        post.createdAt = new Date(post.createdAt);
      });

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  function Header() {
    return (
      <header className="flex w-full items-center justify-between bg-slate-200 px-4 py-3 shadow">
        <h1 className="font-primary text-3xl font-bold text-orange-500">
          Spark ⚡
        </h1>
        <nav className="flex gap-2">
          {!isSignedIn && <SignInButton />}

          {isSignedIn && (
            <div className="flex w-full gap-2">
              <img
                className="h-8 w-8 rounded-full"
                src={user.profileImageUrl}
                alt="Profile picture"
              />
              <SignOutButton />
            </div>
          )}
        </nav>
      </header>
    );
  }

  function Footer() {
    return (
      <footer className="flex w-full items-center justify-center gap-2 bg-slate-300 p-2">
        <p>Developed by Alex Adams</p>
        <a
          target="#"
          href="https://www.linkedin.com/in/alexander-adams-018a04181/"
        >
          <FaLinkedin className="text-xl" />
        </a>
        <a target="#" href="https://github.com/HayaiAlex">
          <FaGithub className="text-xl" />
        </a>
      </footer>
    );
  }

  function PostView(post: Post) {
    return (
      <div
        className={`bg-sllate-100 flex grow flex-col gap-4 rounded border-b bg-slate-200 shadow`}
      >
        <p className="self-center p-2  text-8xl">{post.content}</p>

        <div className="flex flex-col gap-1 rounded-b bg-slate-300 p-2 px-4 shadow">
          <div className="flex items-center gap-1">
            <img
              className="h-6 w-6 rounded-full"
              src={post.profilePicture}
              alt="Profile picture"
            />
            <p className="text-lg">@{post.username}</p>
          </div>
          <p className="text-xs text-slate-500">
            {dayjs(post.createdAt).fromNow()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center text-slate-800">
      <Header />
      <main className="flex w-full flex-col items-center p-2  md:max-w-2xl">
        {isSignedIn && <CreatePost updatePosts={updatePosts} />}

        <div className="flex w-full flex-wrap justify-center gap-2 py-2">
          {posts.map((post) => (
            <PostView {...post} key={post.postId} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
