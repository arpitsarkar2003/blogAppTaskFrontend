import React from 'react'
import { useParams } from 'react-router-dom'
import BlogForm from '../components/blog/BlogForm'

export default function CreateEditBlogPage() {
  const { id } = useParams()
  const postId = id ? parseInt(id, 10) : undefined

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{postId ? 'Edit' : 'Create'} Blog Post</h1>
      <BlogForm postId={postId} />
    </div>
  )
}