import React from 'react';
import { useNavigate } from 'react-router-dom';

const IncomeSolution = () => {
  const navigate = useNavigate();

//   const handleLinkLearnMore = () => {
//     window.open('https://miketoken-io.gitbook.io/miketoken.io/');
//   };

  const handleBuyMkt = () => {
    navigate('/buy');
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto flex justify-between mt-12 p-9 xs:flex-col sm:flex-col lg:flex-row relative z-[1] mb-28">
      {/* Decorative Images */}
      <img
        src="./assets/smaller-star.svg"
        width={40}
        height={40}
        alt="left"
        className="hidden xl:block absolute -left-[100px]"
      />
      <img
        src="./assets/line-star.svg"
        width={772}
        height={123}
        alt="line"
        className="hidden xl:block absolute bottom-[-9%] left-[10%]"
      />
      <img
           src="./assets/smaller-star.svg"
        width={32}
        height={32}
        alt="left"
        className="absolute top-[150px] -left-[50px]"
      />
      <img
           src="./assets/smaller-star.svg"
        width={40}
        height={40}
        alt="right"
        className="hidden xl:block absolute right-0 top-[30%]"
      />

      {/* Text Content */}
      <div className="flex flex-col xs:mb-7 xl:mb-0">
        <span className="text-5xl font-bold leading-[64px] text-gray-50 w-[73%]">
          Not just a Memecoin, NAMO is more...
        </span>
        <span className="text-2xl font-semibold text-gray-50 mt-2">
          NAMO Coin is a decentralized meme token designed to embody patriotic sentiment,
          <span className="text-green-500"> support the Indian Armed Forces, and aid war-affected families. </span>
        </span>
        <p className="text-base text-gray-50 mt-2">
         With tokenomics rooted in charitable impact, NFT-based expression, and deflationary economics, it represents a movement powered by purpose.
        </p>
        <div className="mt-10 flex gap-5 w-full md:w-3/4 xl:w-2/3 z-10">
          <button
            className="bg-green-500 text-white w-[47%] h-12 rounded-md hover:bg-green-600 transition"
            onClick={handleBuyMkt}
          >
            Buy now
          </button>
          <button
            className="border-[1.5px] border-gray-600 bg-gray-800 text-gray-200 w-[47%] h-12 rounded-md hover:bg-gray-700 transition"
            // onClick={handleLinkLearnMore}
          >
            Learn more
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative w-full">
        <img
          src="./assets/blur-ai.webp"
          alt="blur-solution"
          className="absolute w-full h-full -top-[200px] z-[1]"
        />
        <img
          src="./assets/income-solution.webp"
          alt="income-solution-new"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default IncomeSolution;