import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseService";

export const fetchProduct = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No such document!");
  }
};

export const fetchProducts = async () => {
  const q = query(
    collection(db, "products"),
    orderBy("createdAt","desc"),
    limit(60)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const fetchLatestProducts = async (count = 6) => {
  const q = query(
    collection(db, "products"),
    orderBy("createdAt", "desc"),
    limit(count)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addChat = async (productId) => {
  const docRef = doc(db, "products", productId);
  try {
    await updateDoc(docRef, {
      chatcnt: increment(1),
    });
    console.log("채팅 추가 완료");
  } catch (error) {
    console.error("채팅 추가 중 에러: ", error);
  }
};

export const addInterest = async (productId, currentUser) => {
  const docRef = doc(db, "products", productId);
  try {
    await updateDoc(docRef, {
      interest: increment(1),
      interestedUsers: arrayUnion(currentUser.uid),
    });
    console.log("관심 추가 완료");
  } catch (error) {
    console.error("관심 추가 중 에러: ", error);
  }
};

export const removeInterest = async (productId, currentUser) => {
  const docRef = doc(db, "products", productId);
  try {
    await updateDoc(docRef, {
      interest: increment(-1),
      interestedUsers: arrayRemove(currentUser.uid),
    });
    console.log("관심 제거 완료");
  } catch (error) {
    console.error("관심 제거 중 에러: ", error);
  }
};
export const updateProduct = async (productId, updatedData) => {
  const docRef = doc(db, "products", productId);
  try {
    await updateDoc(docRef, updatedData);
    console.log("상품 정보 업데이트 완료");
  } catch (error) {
    console.error("상품 정보 업데이트 중 에러: ", error);
    throw error;
  }
};
