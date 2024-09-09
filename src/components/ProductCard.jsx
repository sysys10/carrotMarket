import { Link } from "react-router-dom";
import { convertToM } from "../utils/functions";

export default function ProductCard({product}) {
    return (
        <Link
          to={`/products/${product.id}`}
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600">{convertToM(product.price)}원</p>
            <p className="text-sm text-gray-500 mb-2">{product.location}</p>
            <div className="flex">
              <div className="text-xs">
                관심 {product.interest} ・ 채팅 {product.chatcnt}
              </div>
            </div>
          </div>
        </Link>
    )
}