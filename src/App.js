import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { BlogProvider } from './contexts/BlogContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogPostPage from './pages/BlogPostPage';
import CreateEditBlogPage from './pages/CreateEditBlogPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BlogProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Nested Routes for Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="blog/:id" element={<BlogPostPage />} />
            <Route path="create" element={<CreateEditBlogPage />} />
            <Route path="edit/:id" element={<CreateEditBlogPage />} />
          </Route>
        </Routes>
        </BlogProvider>
      </AuthProvider>

    </QueryClientProvider>

  );
}

export default App;