import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { MdMenu } from "react-icons/md";
import SideMenu from "./SideMenu";
import dangen from "/dangen.svg"
const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkStyles = ({ isActive }) =>
    `text-gray-800 hover:text-orange-500 transition-colors duration-200 ${
      isActive ? "text-orange-500 font-semibold" : ""
    } text-sm md:text-base`;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="bg-gradient-to-br from-gray-100 to-white p-4 shadow-md">
        <nav className="max-w-5xl mx-auto">
          <div className="mx-auto flex justify-between items-center">
            <Link
              to="/"
              className="text-gray-800 flex items-center font-bold text-xl hover:text-orange-500 transition-colors duration-200"
            >
              <p>한양마켓</p> <img src={dangen} width={'28px'} className="ml-1"/>
            </Link>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-800">
                <MdMenu size={24} />
              </button>
            </div>
            <div className="hidden md:flex items-center justify-center gap-x-4">
              {currentUser ? (
                <>
                  <NavLink to="/products" className={navLinkStyles}>
                    중고거래
                  </NavLink>
                  <NavLink to="/nearby-stores" className={navLinkStyles}>
                    동네업체
                  </NavLink>
                  <NavLink to="/chat" className={navLinkStyles}>
                    채팅
                  </NavLink>
                  {currentUser.isAdmin && (
                    <NavLink to="/admin" className={navLinkStyles}>
                      관리자
                    </NavLink>
                  )}
                  <button
                    onClick={logout}
                    className={navLinkStyles}
                  >
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
      <SideMenu isOpen={isOpen} toggleMenu={toggleMenu} currentUser={currentUser} logout={logout} />
    </>
  );
};

export default Navbar;