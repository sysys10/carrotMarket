import { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebaseService';
import { useAuth } from '../contexts/AuthContext';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const usersQuery = query(collection(db, "users"));
      const productsQuery = query(collection(db, "products"));

      const [usersSnapshot, productsSnapshot] = await Promise.all([
        getDocs(usersQuery),
        getDocs(productsQuery)
      ]);

      setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setProducts(productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      await deleteDoc(doc(db, "users", userId));
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      await deleteDoc(doc(db, "products", productId));
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  if (!currentUser || !currentUser.isAdmin) {
    return <div>접근 권한이 없습니다.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">관리자 페이지</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">사용자 관리</h3>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">이름</th>
              <th className="p-3 text-left">이메일</th>
              <th className="p-3 text-left">작업</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.displayName}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">상품 관리</h3>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">상품명</th>
              <th className="p-3 text-left">가격</th>
              <th className="p-3 text-left">판매자</th>
              <th className="p-3 text-left">작업</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.price}원</td>
                <td className="p-3">{product.sellerName}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;