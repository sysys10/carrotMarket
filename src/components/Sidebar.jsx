import { BiUser } from "react-icons/bi"
import { changeToDate } from "../utils/functions"


const ChatSidebar = ({ chatRooms }) => {
   console.log(chatRooms)
    return (
        <aside className="w-60 h-screen bg-red-200 flex flex-col">
            {chatRooms.map((v, i) => (
                <div className="flex p-3" key={`chat-${i}`}>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <BiUser className="w-8 h-6" />
                    </div>
                    <div className="flex flex-col pl-2">
                        <div className="flex"><div className="text-sm font-semibold text-ellipsis overflow-hidden max-w-20 whitespace-nowrap">{v.buyerName}</div><div className="text-xs">{v.productLocation}</div><div></div>  {changeToDate(v.lastMessageTime.toDate())}</div>
                    </div>
                </div>
            ))}

        </aside>
    )
}

export default ChatSidebar