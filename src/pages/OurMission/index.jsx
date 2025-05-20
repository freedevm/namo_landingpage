import React from "react";
import { listOurMission } from "../../constants/home";
// const listOurMission = [
//   {
//     tile: "Innovative Blockchain Solutions",
//     listDescription: [
//       "Decentralized Finance (DeFi)",
//       "NFT Marketplaces",
//       "Layer 2 Scaling",
//     ],
//   },
//   {
//     tile: "Empowering Developers",
//     listDescription: [
//       "Open Source Tools",
//       "Developer Grants",
//       "Educational Resources",
//     ],
//   },
//   // Add more items as needed
// ];

const OurMission = () => {
  return (
    <div
      id="mission"
      className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 2xl:px-0 mt-12 md:mt-20 lg:mt-28"
    >
      <div className="flex flex-col xl:flex-row justify-between">
        {/* Left Column */}
        <div className="w-full xl:w-[48%] flex flex-col text-gray-50">
          <p className="tracking-[3.2px] text-brand text-green-500 text-lg font-normal  mb-2.5">
            [OUR MISSION]
          </p>
          <h2 className="text-4xl font-extrabold mb-4">
            AI-Powered Innovation: NAMO Token's Memecoin Revolution
          </h2>
          <p className="text-read mb-6">
            Our mission is to democratize access to the most advanced blockchain
            technologies, making them user-friendly, efficient, and customizable
            for individuals from all walks of life.
          </p>
          <img
            src="./assets/our-mission.png"
            alt="Our Mission"
            className="w-auto sm:w-[350px] lg:w-[450px] mx-auto mt-16"
          />
        </div>

        {/* Right Column */}
        <div className="w-full xl:w-[48%] pt-8 xl:pt-0">
          {listOurMission.map((e, idx) => (
            <div
              key={`list-item-our-mission-${idx}`}
              className="border border-[#3B4060] rounded-lg bg-gradient-to-r from-red-900 via-red-600 to-orange-700 text-gray-50 hover:border-brand hover:bg-gradient-to-r hover:to-gray-700  mb-8 p-4"
            >
              <div className="py-6 px-4 flex flex-col w-full">
                <h3 className="mb-4 text-xl font-semibold text-primary">
                  {e?.tile}
                </h3>
                {e?.listDescription?.map((item, index) => (
                  <div
                    key={`list-item-our-mission-${index}`}
                    className="flex items-center mb-4"
                  >
                    <div className="mr-3 w-1.5 h-1.5 rounded-full bg-text-read" />
                    <p className="text-sm text-read">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurMission;