import React, { useContext, useRef, useState } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import endpoints from "../lib/api";
import { useOnClickOutside } from "../lib/hooks";
import { Post } from "../lib/types";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaWindows } from "react-icons/fa";
import zod from "zod";

export default function CreatePost({ updatePosts }: { updatePosts: Function }) {
  const { isLoaded, isSignedIn, user } = useUser();

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
      updatePosts(fullPost);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // always allow removing characters
    if (event.target.value.length < inputEmoji.length) {
      setInputEmoji(event.target.value);
      return;
    }

    // compare input with current state to get new char
    const newChar = event.target.value.replace(inputEmoji, "");
    const zodEmojiRegex = zod.string().emoji();
    const isEmoji = zodEmojiRegex.safeParse(newChar).success;

    // disallow numbers (known zod issue)
    if (!isNaN(Number(newChar))) return;

    if (isEmoji) {
      setInputEmoji(event.target.value);
    }
  };

  return (
    <form
      key="createPostForm"
      className="group relative flex w-full items-center justify-evenly gap-4 rounded bg-slate-300 p-2 px-4 shadow"
    >
      <img
        className="z-10 aspect-square w-16 rounded-full"
        src={user?.profileImageUrl}
        alt="Profile picture"
      />

      <div className="relative grow">
        <input
          key="postInput"
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
              onEmojiClick={(emoji) => setInputEmoji(inputEmoji + emoji.emoji)}
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
