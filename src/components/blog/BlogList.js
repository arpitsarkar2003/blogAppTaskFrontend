import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../../contexts/BlogContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/formatDate';
import { Button } from '../ui/Button';
import { Calendar } from 'lucide-react';

export default function BlogList() {
  const { blogPosts } = useBlog();
  const { isAuthenticated } = useAuth(); // Check if the user is authenticated

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className='flex items-center gap-2 justify-between w-full'>
          <h1 className="text-4xl font-bold mb-6">Blog</h1>
          <Link to={isAuthenticated ? "/create" : "/login"}>
            <Button variant="outline" disabled={!isAuthenticated}>
              {isAuthenticated ? "Create New Post" : "Login to Create Post"}
            </Button>
          </Link>
        </div>
      </div>
      {blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={post.image || '/placeholder.svg'} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                <div className="flex justify-between items-center">
                  <div className='flex gap-2 items-center'>
                    <Calendar className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-500">{formatDate(post.createdAt)}</span>
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="outline">Read More</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No blog posts available.</p>
      )}
    </div>
  );
}
