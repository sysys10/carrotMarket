import { arrayUnion, doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
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


export const addInterest = async (productId, currentUser) => {
  const docRef = doc(db, "products", productId);
  try {
    await updateDoc(docRef, {
      interest: increment(1),
      interestedUsers: arrayUnion(currentUser.uid)
    });
    console.log("관심 추가 완료");
  } catch (error) {
    console.error("관심 추가 중 에러: ", error);
  }
};
export const addChat = async (productId) => {
  const docRef = doc(db, "products", productId);
  try {
    await updateDoc(docRef, {
      chatcnt: increment(1)
    });
    console.log("관심 추가 완료");
  } catch (error) {
    console.error("관심 추가 중 에러: ", error);
  }
};