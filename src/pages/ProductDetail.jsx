import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { createChatRoom } from "../services/chatService.js";
import UserIcons from "../components/UserIcon.jsx";
import { convertToM } from "../utils/functions.js";
import { BiHeart } from "react-icons/bi";
import {
  addInterest,
  addChat,
  fetchProduct,
  removeInterest,
  fetchLatestProducts,
  updateProduct,
} from "../services/productService.js";
import { ProductGrid } from "./ProductList.jsx";
import EditProductModal from "../components/EditProductModal.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [latestProducts, setLatestProducts] = useState([]);
  const [isInterested, setIsInterested] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      const productData = await fetchProduct(id);
      const latest = await fetchLatestProducts(6);
      if (productData) {
        setProduct(productData);
        setIsInterested(
          productData.interestedUsers?.includes(currentUser?.uid)
        );
      }
      if (latest) {
        setLatestProducts(latest.filter((p) => p.id !== id));
      }
    };
    loadProduct();
  }, [id, currentUser]);

  if (!product) {
    return <div>로딩중...</div>;
  }
  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      await updateProduct(product.id, updatedProduct);
      setProduct({ ...product, ...updatedProduct });
      setIsEditModalOpen(false);
      alert("상품 정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("상품 정보 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleChatClick = async () => {
    if (!currentUser) {
      alert("채팅을 시작하려면 로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      const chatRoomId = await createChatRoom(product, currentUser, {
        name: product.sellerName,
        sellerId: product.sellerId,
      });
      await addChat(product.id);
      navigate(`/chat/${chatRoomId}`);
    } catch (error) {
      console.error("Error creating chat room:", error);
      alert("채팅방 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleInterestToggle = async () => {
    if (!currentUser) {
      alert("관심 표시를 위해 로그인이 필요합니다.");
      return;
    }

    try {
      if (isInterested) {
        await removeInterest(product.id, currentUser);
        setIsInterested(false);
        setProduct((prev) => ({
          ...prev,
          interest: Math.max((prev.interest || 0) - 1, 0),
          interestedUsers: prev.interestedUsers.filter(
            (uid) => uid !== currentUser.uid
          ),
        }));
      } else {
        await addInterest(product.id, currentUser);
        setIsInterested(true);
        setProduct((prev) => ({
          ...prev,
          interest: (prev.interest || 0) + 1,
          interestedUsers: [...(prev.interestedUsers || []), currentUser.uid],
        }));
      }
    } catch (error) {
      console.error("관심 토글 중 에러:", error);
      alert("관심 표시 업데이트 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="py-6">
      <div className="bg-white max-w-3xl mx-auto rounded-lg shadow-md p-6">
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
          {currentUser ? (
            currentUser.uid !== product.sellerId ? (
            <button
              onClick={handleChatClick}
              className="bg-orange-500 text-white px-4 py-2 rounded-full inline-block hover:bg-orange-600 transition duration-300"
            >
              채팅으로 거래하기
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-orange-500 text-white px-4 py-2 rounded-full inline-block hover:bg-orange-600 transition duration-300"
            >
              수정하기
            </button>
          )):<div></div>}
          <button
            onClick={handleInterestToggle}
            className={`flex items-center ${
              isInterested ? "text-red-500" : "text-gray-500"
            }`}
          >
            <BiHeart className="text-2xl mr-1" />
            <span>{product.interest || 0}</span>
          </button>
        </div>
      </div>
      {latestProducts.length > 0 && (
        <div className="max-w-3xl mx-auto py-8 px-2">
          <h2 className="text-2xl font-bold mb-4">최신 상품</h2>
          <ProductGrid products={latestProducts} />
        </div>
      )}
      <Link to={"/products"} className="text-base text-blue-600 text-center">
        <div>상품 더 보기</div>
      </Link>
      <EditProductModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        onEditProduct={handleEditProduct}
        product={product}
      />
    </div>
  );
};

export default ProductDetail;
