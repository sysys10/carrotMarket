import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getChatRooms } from '../services/chatService';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const ChatList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = getChatRooms(currentUser.uid, (updatedChatRooms) => {
      setChatRooms(updatedChatRooms);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">채팅 목록</h2>
      {chatRooms.map(room => (
        <Link
          key={room.id}
          to={`/chat/${room.id}`}
          className="block bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition duration-300"
        >
          <h3 className="font-semibold">{room.productName}</h3>
          <p className="text-gray-600 truncate">{room.lastMessage}</p>
          <p className="text-sm text-gray-500 mt-2">
            {formatDistanceToNow(room.lastMessageTime.toDate(), { addSuffix: true, locale: ko })}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default ChatList;