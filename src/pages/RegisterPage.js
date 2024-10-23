import React from 'react'
import RegisterForm from '../components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        <RegisterForm />
      </div>
    </div>
  )
}