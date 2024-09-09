import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { convertToM } from "../utils/functions";
import { fetchProducts } from "../services/product";
import { BiPlus } from "react-icons/bi";
import AddProductModal from "../components/AddProductModal";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const ProductGrid = ({ products }) => {
  return (
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
            <div className="flex">
              <div className="text-xs">
                관심 {product.interest} * 채팅 {product.chatcnt}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchProducts();
      setProducts(res);
    };
    fetch();
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full">
      <div className="w-full h-80 bg-yellow-100">
        <div className="max-w-4xl mx-auto">배너입니다.</div>
      </div>
      <div className="max-w-3xl mx-auto relative">
        <button
          onClick={openModal}
          className="fixed bottom-8 right-8 bg-orange-500 w-16 h-16 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition duration-300"
          aria-label="상품 추가"
        >
          <BiPlus className="text-4xl" />
        </button>
      </div>
      <div className="max-w-3xl mx-auto px-2 py-8">
        <h2 className="text-2xl font-bold mb-4">상품 목록</h2>
        <ProductGrid products={products} />
      </div>
      <AddProductModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default ProductList;