import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-orange-500 mb-8">당근마켓에 오신 것을 환영합니다!</h1>
      <p className="text-xl mb-8">우리 동네의 다양한 중고 물품을 찾아보세요.</p>
      <Link to="/products" className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300">
        상품 둘러보기
      </Link>
    </div>
  );
};

export default Home;