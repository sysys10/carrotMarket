import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebaseService";
import ChatSidebar from "../components/Sidebar";

const Chat = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "chatRooms"),
      where("participants", "array-contains", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const rooms = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatRooms(rooms);
      console.log(chatRooms)
    });

    return () => unsubscribe();
  }, [currentUser]);
  return (
    <div className="flex ">
      <ChatSidebar chatRooms={chatRooms} />
      <div className=" flex-grow p-5">
        <h2 className="text-2xl font-bold mb-4">채팅</h2>
        {chatRooms.map((room) => (
          <div
            key={room.id}

            className="block bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition duration-300"
          >
            <h3 className="font-semibold">{room.productName}</h3>
            <p className="text-gray-600">{room.lastMessage}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(room.lastMessageTime.toDate()).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
