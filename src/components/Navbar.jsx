import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const navLinkStyles = ({ isActive }) =>
    `text-gray-800 hover:text-orange-500 transition-colors duration-200 ${
      isActive ? "text-orange-500 font-semibold" : ""
    }`;

  return (
    <header className=" bg-white p-4 shadow-md">
      <nav className="max-w-5xl mx-auto">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="text-gray-800 font-bold text-xl hover:text-orange-500 transition-colors duration-200">
          한양 마켓
        </Link>
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <NavLink to="/products" className={navLinkStyles}>
                중고거래
              </NavLink>
              <NavLink to="/nearby-stores" className={navLinkStyles}>
                동네업체
              </NavLink>
              <NavLink to="/add-product" className={navLinkStyles}>
                상품등록
              </NavLink>
              <NavLink to="/chat" className={navLinkStyles}>
                채팅
              </NavLink>
              {currentUser.isAdmin && (
                <NavLink to="/admin" className={navLinkStyles}>
                  관리자
                </NavLink>
              )}
              <button onClick={logout} className="text-gray-800 hover:text-orange-500 transition-colors duration-200">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <NavLink to="/products" className={navLinkStyles}>
                중고거래
              </NavLink>
              <NavLink to="/nearby-stores" className={navLinkStyles}>
                동네업체
              </NavLink>
              <NavLink to="/login" className={navLinkStyles}>
                로그인
              </NavLink>
            </>
          )}
        </div>
        </div>
        </nav>
    </header>
  );
};

export default Navbar;