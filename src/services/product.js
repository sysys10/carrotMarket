import { doc, getDoc } from "firebase/firestore";
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
