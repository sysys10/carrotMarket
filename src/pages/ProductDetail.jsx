import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext.jsx';
import { db } from '../services/firebaseService.js';
import { createChatRoom } from '../services/chatService.js';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data())
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  const handleChatClick = async () => {
    console.log(currentUser)
    const chatId =  await createChatRoom(product,currentUser,product)
    navigate(`/chat/${chatId}`)
  }

  return (
    <div className="bg-white max-w-4xl mx-auto rounded-lg shadow-md p-6">
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-xl font-semibold mb-4">{product.price}원</p>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-sm text-gray-500 mb-4">위치: {product.location}</p>
      <p className="text-sm text-gray-500 mb-4">판매자: {product.sellerName}</p>
      {currentUser && currentUser.uid !== product.sellerId && (
        <button onClick={handleChatClick} className="bg-orange-500 text-white px-4 py-2 rounded-full inline-block hover:bg-orange-600 transition duration-300">
          채팅으로 거래하기
        </button>
      )}
    </div>
  );
};

export default ProductDetail;