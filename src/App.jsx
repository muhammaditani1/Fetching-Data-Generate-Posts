import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  // this is to save the data being fetched
  const [posts, setPosts] = useState([]);
  // this is to control the loading
  const [loading, setLoading] = useState(true);
  // to catch an error when fetching
  const [error, setError] = useState(null);
  // so it would not fetch data twice
  const [hasFetched, setHasFetched] = useState(false);
  // to save the random post i want to generate
  const [randomPost, setRandomPost] = useState(null);
  // "https://jsonplaceholder.typicode.com/posts"

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Network error: " + response.status);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
    setHasFetched(true);
  }, [hasFetched]);
  const onHandleClick = () => {
    if (posts.length > 0) {
      const randomIndex = Math.floor(Math.random() * posts.length);
      setRandomPost(posts[randomIndex]);
    }
  };

  return (
    <div className="container">
      <h1>Posts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div>
        <button onClick={onHandleClick}>Generate Post</button>
      </div>
      {randomPost && (
        <div className="post">
          <h2>{randomPost.title}</h2>
          <p>{randomPost.body}</p>
        </div>
      )}
    </div>
  );
};

export default App;
