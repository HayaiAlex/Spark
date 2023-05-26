import React, { useEffect, useRef, useState } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";

// Utils
import endpoints from "./lib/api";
import type { Post } from "./lib/types";
import { useOnClickOutside } from "./lib/hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Components
import EmojiPicker from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import { FaLinkedin, FaGithub, FaWindows } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";

dayjs.extend(relativeTime);

export default function App() {
  const { isLoaded, isSignedIn, user } = useUser();

  // State
  const [posts, setPosts] = useState<Post[]>([]);
  const [inputEmoji, setInputEmoji] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Refs
  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);

  // Effects
  useOnClickOutside([emojiPickerRef, inputRef], () => {
    setShowEmojiPicker(false);
  });

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
    <div className="flex w-full flex-col items-center text-slate-800">
      <Header />
      <main className="flex w-full flex-col items-center p-2  md:max-w-2xl">
        {isSignedIn && <CreatePost />}

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
      <header className="flex w-full items-center justify-between bg-slate-200 px-4 py-3">
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

  function CreatePost() {
    return (
      <form className="group relative flex w-full items-center justify-evenly gap-4 rounded bg-slate-300 p-2 px-4">
        <img
          className="z-10 aspect-square w-16 rounded-full"
          src={user?.profileImageUrl}
          alt="Profile picture"
        />

        <div className="relative grow">
          <input
            ref={inputRef}
            name="content"
            className={`${
              inputEmoji == "" ? "text-md" : "text-3xl"
            } peer h-16 w-full rounded-full border-2 border-slate-500  bg-slate-400 p-4 outline-none  placeholder:text-slate-50 placeholder:grayscale focus:border-y  focus:border-slate-200 focus:placeholder-transparent`}
            type="text"
            onChange={handleChange}
            value={inputEmoji}
            placeholder="Send some emojis..."
          />

          <button
            className="absolute right-2 top-3 text-4xl opacity-50   transition-all hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              setShowEmojiPicker(!showEmojiPicker);
            }}
          >
            😀
          </button>
          {showEmojiPicker && (
            <div className="absolute right-0 top-20" ref={emojiPickerRef}>
              <EmojiPicker
                emojiStyle={EmojiStyle.NATIVE}
                onEmojiClick={(emoji) =>
                  setInputEmoji(inputEmoji + emoji.emoji)
                }
              />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <button
            type="submit"
            onClick={addEmoji}
            className="h-10 w-20 rounded-full bg-orange-400  p-1 px-2 hover:bg-orange-500"
          >
            Post
          </button>

          <div
            className="relative flex items-center gap-1 pt-1 text-sm hover:cursor-help"
            onMouseEnter={() => setShowHelp(true)}
            onMouseLeave={() => setShowHelp(false)}
          >
            <p className="text-slate-500">On PC?</p>
            <AiOutlineQuestionCircle className="h-4 w-4" />

            <p
              className={`${
                showHelp ? "" : "hidden"
              } absolute -right-3 top-0 flex w-max rounded-full bg-slate-200 bg-opacity-80 p-1 px-1 text-xs text-slate-800`}
            >
              <span className="flex items-center">
                <FaWindows />
              </span>
              +<span className="pr-1 font-bold">.</span> opens an emoji picker.
            </p>
          </div>
        </div>
      </form>
    );
  }

  function PostView(post: Post) {
    const scales = ["75", "100", "125"];

    return (
      <div
        className={`bg-sllate-100 flex grow flex-col gap-4 rounded border-b bg-slate-200`}
      >
        <p className="self-center p-2  text-8xl">{post.content}</p>

        <div className="flex flex-col gap-1 rounded-b bg-slate-300 p-2 px-4">
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
}
