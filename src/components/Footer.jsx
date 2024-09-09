import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaBlog } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-orange-500 text-2xl font-bold mb-4">한양 마켓</h2>
            <p className="mb-4">
              당신 근처의 한양 마켓<br />
              내 동네를 설정하고 한양 마켓을 시작해보세요.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                <FaYoutube size={24} />
              </a>
              <a href="https://blog.naver.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                <FaBlog size={24} />
              </a>
            </div>
          </div>
          <div className="w-full md:w-2/3 flex flex-wrap">
            <div className="w-1/2 md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-sm font-semibold mb-4">중고거래</h3>
              <ul>
                <li><Link to="/products" className="hover:text-orange-500">매물 리스트</Link></li>
                <li><Link to="/add-product" className="hover:text-orange-500">매물 등록</Link></li>
                <li><Link to="/search" className="hover:text-orange-500">관심 매물</Link></li>
              </ul>
            </div>
            <div className="w-1/2 md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-sm font-semibold mb-4">동네생활</h3>
              <ul>
                <li><Link to="/nearby-stores" className="hover:text-orange-500">동네가게</Link></li>
                <li><Link to="/community" className="hover:text-orange-500">동네 소식</Link></li>
                <li><Link to="/events" className="hover:text-orange-500">이벤트</Link></li>
              </ul>
            </div>
            <div className="w-1/2 md:w-1/3">
              <h3 className="text-sm font-semibold mb-4">고객지원</h3>
              <ul>
                <li><Link to="/faq" className="hover:text-orange-500">자주 묻는 질문</Link></li>
                <li><Link to="/contact" className="hover:text-orange-500">문의하기</Link></li>
                <li><Link to="/terms" className="hover:text-orange-500">이용약관</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2024 한양 마켓. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;