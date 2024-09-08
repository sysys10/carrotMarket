import { 
    addDoc, 
    collection, 
    doc, 
    getDoc, 
    updateDoc, 
    query, 
    where, 
    orderBy, 
    onSnapshot, 
    serverTimestamp,
    getDocs
  } from "firebase/firestore";
  import { db } from "./firebaseService";
  export const createChatRoom = async (product, buyer, seller) => {
    try {
      // 먼저 이미 존재하는 채팅방이 있는지 확인
      const chatRoomsRef = collection(db, "chatRooms");
      const q = query(
        chatRoomsRef, 
        where("productId", "==", product.id),
        where("participants", "array-contains", buyer.uid)
      );
      
      const querySnapshot = await getDocs(q);
      
      // 이미 존재하는 채팅방이 있다면 그 ID를 반환
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
      }
  
      // 존재하지 않는다면 새로운 채팅방 생성
      const data = {
        buyerName: buyer.displayName,
        sellerName: seller.sellerName,
        productId: product.id,
        productName: product.name,
        productLocation:product.location,
        lastMessage: "",
        lastMessageTime: serverTimestamp(),
        participants: [buyer.uid, seller.sellerId],
        createdAt: serverTimestamp()
      };
      const chatRoomRef = await addDoc(chatRoomsRef, data);
      return chatRoomRef.id;
    } catch (error) {
      console.error("Error creating or finding chat room", error);
      throw error;
    }
  };
  export const sendMessage = async (chatRoomId, senderId, message) => {
    try {
      // 채팅방 존재 여부 확인
      const chatRoomRef = doc(db, "chatRooms", chatRoomId);
      const chatRoomSnap = await getDoc(chatRoomRef);
  
      if (!chatRoomSnap.exists()) {
        throw new Error("Chat room does not exist");
      }
  
      // 메시지 추가
      await addDoc(collection(db, "chatRooms", chatRoomId, "messages"), {
        senderId,
        message,
        timestamp: new Date(),
      });
  
      // 채팅방 정보 업데이트
      await updateDoc(chatRoomRef, {
        lastMessage: message,
        lastMessageTime: new Date(),
      });
    } catch (error) {
      console.error("Error sending message", error);
      throw error;
    }
  };
  
  export const getChatRoomData = async (chatRoomId) => {
    try {
      const chatRoomRef = doc(db, "chatRooms", chatRoomId);
      const chatRoomSnap = await getDoc(chatRoomRef);
  
      if (chatRoomSnap.exists()) {
        return { id: chatRoomSnap.id, ...chatRoomSnap.data() };
      } else {
        throw new Error("Chat room not found");
      }
    } catch (error) {
      console.error("Error getting chat room data", error);
      throw error;
    }
  };
  
  export const getChatRooms = (userId, callback) => {
    const q = query(
      collection(db, "chatRooms"),
      where("participants", "array-contains", userId),
      orderBy("lastMessageTime", "desc")
    );
  
    return onSnapshot(q, (querySnapshot) => {
      const chatRooms = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(chatRooms);
    });
  };
  
  export const getChatMessages = (chatRoomId, callback) => {
    const q = query(
      collection(db, "chatRooms", chatRoomId, "messages"),
      orderBy("timestamp")
    );
  
    return onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    });
  };