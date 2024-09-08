import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [error, setError] = useState('');
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setError('');
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      setError('구글 로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">로그인</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center hover:bg-gray-100 transition duration-300"
      >
        <img src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' alt="Google logo" className="w-6 h-6 mr-2" />
        구글로 로그인
      </button>
    </div>
  );
};

export default Login;