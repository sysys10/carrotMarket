import { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import { BiPlus } from "react-icons/bi";
import AddProductModal from "../components/AddProductModal";
import Modal from 'react-modal';
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";

Modal.setAppElement('#root');

export const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product}/>
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
     <Banner/>
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