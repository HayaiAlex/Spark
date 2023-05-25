import React, { useEffect, useState } from "react";
import endpoints from "./lib/api";
import { type Post } from "./lib/types";

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    try {
      const response = await fetch(endpoints.getAllPosts);
      const data = await response.json();

      // convert c# date string to js date
      data.forEach((post: Post) => {
        post.createdAt = new Date(post.createdAt);
      });

      setPosts(data);
      data.forEach((post: Post) => {
        console.log(post);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex justify-center">
      <h1 className="text-xl font-bold text-blue-500 hover:font-semibold">
        Spark
      </h1>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Content</th>
            <th>Created</th>
            <th>Author</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.postId}>
              <td>{post.postId}</td>
              <td>{post.content}</td>
              <td>{post.createdAt.toDateString()}</td>
              <td>{post.authorId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
