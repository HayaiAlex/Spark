import React, { useEffect, useState } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import endpoints from "./lib/api";
import type { Post } from "./lib/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaLinkedin, FaGithub } from "react-icons/fa";
dayjs.extend(relativeTime);

export default function App() {
  const { isLoaded, isSignedIn, user } = useUser();

  const [posts, setPosts] = useState<Post[]>([]);
  const [inputEmoji, setInputEmoji] = useState("");

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

  const addEmoji = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user || !user.id) return;
    if (!inputEmoji) return;

    try {
      let post = {
        postId: 0,
        createdAt: new Date(),
        content: inputEmoji,
        authorId: user.id,
      };

      const response = await fetch(endpoints.createPost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      console.log(data);
      setInputEmoji("");
      // add author info to post
      if (!user.username || !user.profileImageUrl) return;
      let fullPost: Post = {
        ...post,
        username: user.username,
        profilePicture: user.profileImageUrl,
      };
      setPosts((prev) => [fullPost, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // check if content is only emojis
    const emojiRegex = /^$|[\u{1F300}-\u{1F6FF}]/u;
    const isEmoji = emojiRegex.test(event.target.value);
    if (!isEmoji) return;
    setInputEmoji(event.target.value);
  };

  return (
    <div className="flex w-full flex-col items-center text-slate-100">
      <Header />
      <main className="flex w-full flex-col items-center p-2  md:max-w-2xl">
        {isSignedIn && (
          <div className="group relative flex w-full items-center justify-center gap-4 p-2">
            <img
              className="z-10 -mx-8 aspect-square w-24 rounded-full"
              src={user?.profileImageUrl}
              alt="Profile picture"
            />
            <form className="-m-8 flex justify-center">
              <input
                name="content"
                className="peer h-24 w-80  bg-slate-600 bg-transparent text-center text-4xl outline-none  placeholder:grayscale focus:border-y  focus:border-slate-400 focus:placeholder-transparent "
                type="text"
                onChange={handleChange}
                value={inputEmoji}
                placeholder="⚡"
              />
              <button
                type="submit"
                onClick={addEmoji}
                className="w-12 rounded-r bg-slate-400 p-1 px-2 transition-all hover:font-bold"
              >
                Post
              </button>
            </form>
          </div>
        )}

        <div className="flex w-full flex-wrap justify-center gap-2 py-2">
          {posts.map((post) => (
            <PostView {...post} key={post.postId} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );

  function Header() {
    return (
      <header className="flex w-full items-center justify-between bg-slate-600 px-4 py-3">
        <h1 className="text-3xl font-bold">Spark ⚡</h1>
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
      <footer className="flex w-full items-center justify-center gap-2 bg-slate-500 p-2">
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
    const scales = ["75", "100", "125"];

    return (
      <div
        className={`flex grow flex-col gap-4 border-b border-slate-300 bg-slate-500`}
      >
        <p className="self-center p-2  text-8xl">{post.content}</p>

        <div className="flex flex-col gap-1 bg-slate-400 p-2 px-4">
          <div className="flex items-center gap-1">
            <img
              className="h-6 w-6 rounded-full"
              src={post.profilePicture}
              alt="Profile picture"
            />
            <p className="text-lg">{post.username}</p>
          </div>
          <p className="text-xs text-slate-300">
            {dayjs(post.createdAt).fromNow()}
          </p>
        </div>
      </div>
    );
  }
}
