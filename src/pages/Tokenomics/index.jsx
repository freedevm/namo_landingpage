import React, { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const listTokenomics = [
  { title: "Public Sale & DEX Liquidity", value: 25, bg: "bg-green-500" },
  { title: "Liquidity Pool (time-locked)", value: 15, bg: "bg-blue-500" },
  { title: "Creators & Core Team", value: 20, bg: "bg-purple-500" },
  { title: "DeshChain Development Fund", value: 15, bg: "bg-yellow-500" },
  { title: "NFT, Staking & Community Rewards", value: 10, bg: "bg-purple-700" },
  { title: "DAO Governance Treasury", value: 5, bg: "bg-yellow-700" },
  { title: "Initial Burn", value: 10, bg: "bg-purple-700" },
];

const Tokenomics = () => {
  const data = [
    { name: "Public Sale & DEX Liquidity", quantity: 25, color: "#22c55e" },
    { name: "Liquidity Pool (time-locked)", quantity: 15, color: "#3b82f6" },
    { name: "Creators & Core Team", quantity: 20, color: "#a855f7" },
    { name: "DeshChain Development Fund", quantity: 15, color: "#eab308" },
    { name: "NFT, Staking & Community Rewards", quantity: 10, color: "#7e22ce" },
    { name: "DAO Governance Treasury", quantity: 5, color: "#a16207" },
    { name: "Initial Burn", quantity: 10, color: "#7e22ce" },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#a855f7", "#eab308","#7e22ce", "#a16207", "#7e22ce"];

  // Responsive sizes based on viewport width
  const sizeChart = useMemo(() => {
    if (window.innerWidth >= 1025) return 400;
    if (window.innerWidth >= 769) return 340;
    if (window.innerWidth >= 481) return 380;
    return 250;
  }, []);

  const sizeOuter = useMemo(() => {
    if (window.innerWidth >= 1025) return 150;
    if (window.innerWidth >= 769) return 120;
    if (window.innerWidth >= 481) return 140;
    return 70;
  }, []);

  const sizeInner = useMemo(() => {
    if (window.innerWidth >= 1025) return 120;
    if (window.innerWidth >= 769) return 100;
    if (window.innerWidth >= 481) return 110;
    return 50;
  }, []);

  return (
    <div
      id="tokenomics"
      className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 2xl:px-0 mt-12 md:mt-20 lg:mt-28"
    >
      <div
        className="p-6 border-2 border-gray-700 rounded-xl bg-gradient-to-br from-[#24647d66] via-transparent to-transparent"
        style={{
          background:
            "radial-gradient(213.29% 109.87% at 8.93% -0.00%, rgba(36, 100, 125, 0.50) 0%, rgba(28, 34, 37, 0.50) 34.76%, rgba(19, 19, 20, 0.50) 63.42%)",
        }}
      >
        {/* Corner borders */}
        {/* <div className="absolute top-0 left-0 w-9 h-9 rounded-tl-lg border-2 border-brand border-t-2 border-l-2" />
        <div className="absolute bottom-0 left-0 w-9 h-9 rounded-bl-lg border-2 border-brand border-b-2 border-l-2" />
        <div className="absolute top-0 right-0 w-9 h-9 rounded-tr-lg border-2 border-brand border-t-2 border-r-2" />
        <div className="absolute bottom-0 right-0 w-9 h-9 rounded-br-lg border-2 border-brand border-b-2 border-r-2" /> */}

        {/* Content container */}
        <div className="flex flex-col xl:flex-row justify-between relative">
          {/* Left text section */}
          <div className="w-full xl:w-1/2 flex flex-col space-y-4">
            <div className="tracking-[3.2px] text-brand text-lg font-normal text-[#1ed760]">
              [TOKENOMICS]
            </div>
            <h2 className="text-4xl font-extrabold text-primary mb-4 text-white">
              Fairly Distributed
            </h2>
            <div className="text-primary mb-6 text-gray-300"> {/* Adjust text color as needed */}
              <p>
                Discover NAMO Tokenomics: Unveiling our ecosystem's potential.
                From token allocation to liquidity strategies and rewarding
                opportunities, we revolutionize the blockchain landscape. Join us
                as we shape the future together.
              </p>
            </div>
            {/* Tokenomics list */}
            {listTokenomics.map((e, idx) => (
              <div
                key={`item_tokenomics_${e.title}`}
                className={`flex justify-between items-center text-gray-300 mt-${idx === 0 ? '0' : '6'}`}
              >
                <div className="text-primary font-medium">{e?.title}</div>
                <div className={`px-3 py-1 rounded ${e?.bg}`}>
                  <span
                    className={`text-sm ${
                      idx === 1 || idx === 2 ? "text-primary" : "text-gray-700"
                    }`}
                  >
                    {e?.value}%
                  </span>
                </div>
              </div>
            ))}

            {/* Buttons */}
            <div className="mt-6 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex items-center justify-center bg-[rgba(30,215,96,0.15)] bg-opacity-50 h-10 w-full md:w-1/2 rounded px-3">
                <img src="./assets/check-icon.svg" alt="icon-check" className="mr-3" />
                <span className="text-brand font-medium text-[#1ed760]">2.5% tax</span>
              </div>
              <div className="flex items-center justify-center bg-[rgba(30,215,96,0.15)] bg-opacity-50 h-10 w-full md:w-1/2 rounded px-3 mt-4 md:mt-0">
                <img src="./assets/check-icon.svg" alt="icon-check" className="mr-3" />
                <span className="text-brand font-medium text-[#1ed760]">No team token</span>
              </div>
            </div>
          </div>

          {/* Right Pie chart section */}
          <div className="w-full xl:w-1/2 flex justify-center items-center mt-10 xl:mt-0 relative">
            {/* Token icon centered */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center">
            <img
            src="./assets/logo.png"
            alt="tokenomics"
            className="w-12 h-12 md:w-20 md:h-20"
            />
            </div>
            </div>

            {/* Pie chart */}
            <div className="relative">
            <ResponsiveContainer width={sizeChart} height={sizeChart}>
            <PieChart style={{ border: "none" }}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={sizeOuter}
                innerRadius={sizeInner}
                dataKey="quantity"
            >
                {data.map((entry, index) => (
                <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                />
                ))}
            </Pie>
            </PieChart>
            </ResponsiveContainer>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;