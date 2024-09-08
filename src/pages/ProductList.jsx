import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseService";
import { Link } from "react-router-dom";
import { convertToM } from "../utils/functions";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto pt-20">
      <h2 className="text-2xl font-bold mb-4">상품 목록</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600">{convertToM(product.price)}원</p>
              <p className="text-sm text-gray-500 mt-2">{product.location}</p>
              <div className="flex"><div className="text-xs">관심 {product.interest} * 채팅 {product.chatcnt}</div></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
