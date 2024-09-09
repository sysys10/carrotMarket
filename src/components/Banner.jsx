import bannerImage from "../assets/dangenBanner.png";

export default function Banner() {
  return (
    <div className="w-full h-80 bg-gradient-to-br from-yellow-200 to-gray-100">
      <div className="max-w-3xl mx-auto flex justify-between h-full items-center">
        <div className="">
          <h2 className="text-3xl font-semibold">
            믿을만한 <br /> 이웃 간 중고거래
          </h2>
          <p className="text-lg leading-6 mt-4">
            동네 주민들과 가깝고 따뜻한 거래를 <br /> 지금 경험해보세요.
          </p>
        </div>
        <img src={bannerImage} className="h-60" />
      </div>
    </div>
  );
}
