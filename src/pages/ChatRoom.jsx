import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getChatMessages, sendMessage, getChatRoomData } from '../services/chatService';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatRoomData, setChatRoomData] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => navigate('/chat')} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          채팅 목록으로 돌아가기
        </button>
      </div>
    );
  }

  if (!chatRoomData) {
    return <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4">로딩 중...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">{chatRoomData.productName}</h2>
      <div className="h-96 overflow-y-auto mb-4">
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
      <form onSubmit={handleSubmit} className="flex">
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
      </form>
    </div>
  );
};

export default ChatRoom;