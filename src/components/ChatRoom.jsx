import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getChatMessages, sendMessage, getChatRoomData } from '../services/chatService';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Link } from 'react-router-dom';

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatRoomData, setChatRoomData] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!roomId || !currentUser) return;

    const fetchChatRoomData = async () => {
      try {
        const data = await getChatRoomData(roomId);
        setChatRoomData(data);
        
        const unsubscribe = getChatMessages(roomId, (updatedMessages) => {
          setMessages(updatedMessages);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching chat room data:", error);
        setError("채팅방을 찾을 수 없습니다.");
      }
    };

    fetchChatRoomData();
  }, [roomId, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      await sendMessage(roomId, currentUser.uid, newMessage);
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
      setError("메시지 전송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!chatRoomData) {
    return <div className="p-4">로딩 중...</div>;
  }

  return (
    <div className="flex flex-col h-[95vh]">
      <div className="bg-white shadow-md p-4">
        <Link to={`/products/${chatRoomData.productId}`} className="text-xl font-bold">{chatRoomData.productName}</Link>
        <p className="text-sm text-gray-500">{chatRoomData.productLocation}</p>
      </div>
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`mb-2 ${msg.senderId === currentUser.uid ? 'text-right' : 'text-left'}`}
          >
            <div className={`inline-block max-w-xs ${msg.senderId === currentUser.uid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg py-2 px-4 text-sm`}>
              {msg.message}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {formatDistanceToNow(msg.timestamp.toDate(), { addSuffix: true, locale: ko })}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow mr-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="메시지를 입력하세요..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            전송
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;