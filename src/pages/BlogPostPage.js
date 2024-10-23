import React from 'react'
import { useParams } from 'react-router-dom'
import BlogPost from '../components/blog/BlogPost'

export default function BlogPostPage() {
  const { id } = useParams()

  return (
    <div>
      <BlogPost />
    </div>
  )
}