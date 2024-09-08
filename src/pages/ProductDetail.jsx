import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext.jsx";
import { db } from "../services/firebaseService.js";
import { createChatRoom } from "../services/chatService.js";
import UserIcons from "../components/UserIcon.jsx";
import { convertToM } from "../utils/functions.js";
import { BiHeart } from "react-icons/bi";
import { addInterest, addChat, fetchProduct } from "../services/product.js";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isInterested, setIsInterested] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      const productData = await fetchProduct(id);
      if (productData) {
        setProduct(productData);
        setIsInterested(
          productData.interestedUsers?.includes(currentUser?.uid)
        );
      }
    };
    loadProduct();
  }, [id, currentUser]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleChatClick = async () => {
    const chatId = await createChatRoom(product, currentUser, product);
    await addChat(product.id);
    navigate(`/chat/${chatId}`);
  };

  const handleInterestClick = async () => {
    if (currentUser) {
      await addInterest(product.id, currentUser);
      setIsInterested(true);
      setProduct((prev) => ({
        ...prev,
        interest: (prev.interest || 0) + 1,
        interestedUsers: [...(prev.interestedUsers || []), currentUser.uid],
      }));
    } else {
      // 로그인이 필요하다는 메시지를 표시하거나 로그인 페이지로 리다이렉트
      alert("관심 표시를 위해 로그인이 필요합니다.");
    }
  };

  return (
    <div className="bg-white max-w-3xl mt-10 mx-auto rounded-lg shadow-md p-6">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-[420px] object-cover rounded-lg mb-4"
      />
      <div className="flex p-2 items-center">
        <UserIcons />
        <div className="flex flex-col ml-2">
          <div className="text-sm font-semibold">{product.sellerName}</div>
          <div className="text-xs">{product.location}</div>
        </div>
      </div>
      <div className="my-2 block border-b-2"></div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-xl font-semibold mb-4">
          {convertToM(product.price)}원
        </p>

        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-sm text-gray-500 mb-4">위치: {product.location}</p>
        <p className="text-sm text-gray-500 mb-4">
          판매자: {product.sellerName}
        </p>
      </div>
      <div className="flex justify-between items-center">
        {currentUser && currentUser.uid !== product.sellerId ? (
          <button
            onClick={handleChatClick}
            className="bg-orange-500 text-white px-4 py-2 rounded-full inline-block hover:bg-orange-600 transition duration-300"
          >
            채팅으로 거래하기
          </button>
        ) : (
          <button className="bg-orange-500 text-white px-4 py-2 rounded-full inline-block hover:bg-orange-600 transition duration-300">
            수정하기
          </button>
        )}
        <button
          onClick={handleInterestClick}
          className={`flex items-center ${
            isInterested ? "text-red-500" : "text-gray-500"
          }`}
          disabled={isInterested}
        >
          <BiHeart className="text-2xl mr-1" />
          <span>{product.interest || 0}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
