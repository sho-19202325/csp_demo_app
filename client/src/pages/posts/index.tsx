import React, { CSSProperties, ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Post } from 'src/type'
import axios from 'axios'

const API_HOST = "http://localhost:3001/api/v1"

const IndexPosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState<Omit<Post, "id">>({ title: "", content: ""})

  const fetchPosts = async () => {
    try {
      const response = await axios.get<Post[]>(`${API_HOST}/posts`)
      setPosts(response.data)
    } catch(error) {
      console.error(error)
    }
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPost({...newPost, title: event.target.value})
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost({...newPost, content: event.target.value})
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post<Post>(`${API_HOST}/posts`, newPost)
      setPosts([...posts, response.data])
      setNewPost({ title: "", content: "" })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // アクセストークンをローカルストレージに保存
    localStorage.setItem('accessToken', "アクセストークンの中身")

    fetchPosts()
  }, [])

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1>新規作成</h1>
      <form onSubmit={handleSubmit} style={{
            width: 500,
            display: "flex",
            flexDirection: "column",
            gap: "10px"
      }}>
        <input type="text" value={newPost.title} onChange={handleTitleChange} maxLength={50} placeholder='title' required />
        <textarea value={newPost.content} onChange={handleContentChange} maxLength={1000} placeholder='content' />
        <button type="submit">登録</button>
      </form>

      <h1>投稿一覧</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      ))}
    </div>
  )
}

export default IndexPosts
