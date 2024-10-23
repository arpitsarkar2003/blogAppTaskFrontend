import React, { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from './AuthContext';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth(); // Access the authentication state from AuthContext

  // Query for fetching blog posts only if the user is authenticated
  const { 
    data: blogPosts, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      if (!isAuthenticated) return []; // Return empty if not authenticated
      const response = await api.get('/posts');
      return response.data;
    },
    retry: 1,
    staleTime: 30000, // Consider data fresh for 30 seconds
    enabled: isAuthenticated, // Only run the query if authenticated
  });

  // Get single blog post
  const getBlogPost = async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  };

  // Create blog post mutation
  const createBlogPost = useMutation({
    mutationFn: async (newPost) => {
      const response = await api.post('/posts', newPost);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
    onError: (error) => {
      throw new Error(error.response?.data?.message || 'Failed to create blog post');
    },
  });

  // Update blog post mutation
  const updateBlogPost = useMutation({
    mutationFn: async ({ id, ...updatedPost }) => {
      const response = await api.put(`/posts/${id}`, updatedPost);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
    onError: (error) => {
      throw new Error(error.response?.data?.message || 'Failed to update blog post');
    },
  });

  // Delete blog post mutation
  const deleteBlogPost = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
    onError: (error) => {
      throw new Error(error.response?.data?.message || 'Failed to delete blog post');
    },
  });

  return (
    <BlogContext.Provider
      value={{
        blogPosts: blogPosts || [],
        isLoading,
        error,
        refetch,
        getBlogPost,
        createBlogPost: createBlogPost.mutate,
        updateBlogPost: updateBlogPost.mutate,
        deleteBlogPost: deleteBlogPost.mutate,
        createBlogPostLoading: createBlogPost.isPending,
        updateBlogPostLoading: updateBlogPost.isPending,
        deleteBlogPostLoading: deleteBlogPost.isPending,
        createBlogPostError: createBlogPost.error,
        updateBlogPostError: updateBlogPost.error,
        deleteBlogPostError: deleteBlogPost.error,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
