import React from "react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import UserIcons from "./UserIcon";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const ChatSidebar = ({ chatRooms, onSelectRoom, selectedRoomId }) => {
  const currentUser = useAuth();
  return (
    <aside className="w-80 h-full bg-gray-100 overflow-y-auto border-r">
      {chatRooms.map((room) => (
        <Link
          key={room.id}
          className={`flex p-4 cursor-pointer hover:bg-gray-200 ${
            selectedRoomId === room.id ? "bg-gray-300" : ""
          }`}
        to={`/chat/${room.id}`}
          >
          <UserIcons />
          <div className="flex flex-col pl-3 flex-grow">
            <div className="flex justify-between items-baseline">
              <div className="text-sm font-semibold truncate max-w-24 w-full">
                {room.buyerName == currentUser.uid
                  ? room.buyerName
                  : room.sellerName}
              </div>
              <div className="text-xs text-gray-500">
                {formatDistanceToNow(room.lastMessageTime.toDate(), {
                  addSuffix: true,
                  locale: ko,
                })}
              </div>
            </div>
            <div className="text-sm text-gray-600 truncate">
              {room.lastMessage}
            </div>
            <div className="text-xs text-gray-500">{room.productName}</div>
          </div>
        </Link>
      ))}
    </aside>
  );
};

export default ChatSidebar;
