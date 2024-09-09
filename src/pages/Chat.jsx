import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getChatRooms } from "../services/chatService";
import ChatSidebar from "../components/ChatSidebar";
import ChatRoom from "../components/ChatRoom";

const Chat = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { currentUser } = useAuth();
  const { roomId } = useParams();  // URL에서 roomId 파라미터를 가져옵니다.

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = getChatRooms(currentUser.uid, (updatedChatRooms) => {
      setChatRooms(updatedChatRooms);
      
      // URL에 roomId가 있으면 해당 채팅방을 선택합니다.
      if (roomId) {
        const room = updatedChatRooms.find(room => room.id === roomId);
        if (room) {
          setSelectedRoom(room);
        }
      }
    });

    return () => unsubscribe();
  }, [currentUser, roomId]);

  return (
    <div className="flex h-screen">
      <ChatSidebar 
        chatRooms={chatRooms} 
        onSelectRoom={setSelectedRoom} 
        selectedRoomId={selectedRoom?.id}
      />
      <div className="flex-grow">
        {selectedRoom ? (
          <ChatRoom roomId={selectedRoom.id} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            채팅방을 선택해주세요.
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;