import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";

const SideMenu = ({ isOpen, toggleMenu, currentUser, logout }) => {
  const navLinkStyles = ({ isActive }) =>
    `block py-2 px-4 text-gray-800 hover:bg-orange-100 transition-colors duration-200 ${
      isActive ? "text-orange-400 font-semibold" : ""
    }`;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">메뉴</h2>
        <button onClick={toggleMenu} className="text-gray-600">
          <MdClose size={24} />
        </button>
      </div>
      <nav className="mt-4">
        {currentUser ? (
          <>
            <NavLink to="/products" className={navLinkStyles} onClick={toggleMenu}>
              중고거래
            </NavLink>
            <NavLink to="/nearby-stores" className={navLinkStyles} onClick={toggleMenu}>
              동네업체
            </NavLink>
          
            <NavLink to="/chat" className={navLinkStyles} onClick={toggleMenu}>
              채팅
            </NavLink>
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="block w-full text-left py-2 px-4 text-gray-800 hover:bg-orange-100 transition-colors duration-200"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <NavLink to="/products" className={navLinkStyles} onClick={toggleMenu}>
              중고거래
            </NavLink>
            <NavLink to="/nearby-stores" className={navLinkStyles} onClick={toggleMenu}>
              동네업체
            </NavLink>
            <NavLink to="/login" className={navLinkStyles} onClick={toggleMenu}>
              로그인
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default SideMenu;