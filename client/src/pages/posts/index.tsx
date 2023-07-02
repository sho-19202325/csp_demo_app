import React, { useEffect, useState } from 'react'
import { Post } from 'src/type'
import axios from 'axios'

const IndexPosts = () => {
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async () => {
    try {
      const response = await axios.get<Post[]>("http://localhost:3001/api/v1/posts")
      setPosts(response.data)
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return <>
    <h1>新規作成</h1>
    {/* TODO: 投稿フォーム作成 */}

    <h1>投稿一覧</h1>
    {posts.map((post) => (
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    ))}
    
  </>
}

export default IndexPosts
