
import React from "react";
import dayjs from "dayjs";

const Roadmap = () => {
  const roadmap = [
    {
      name: "q1",
      precious: "Q3, 2025",
      quarter: 3,
      year: 2023,
      endTime: "2023-09-30",
      contentOne: "Decentralized Finance (DeFi)",
      contentTwo:
        "Staking: Launch of staking platform. An MMT rewarding pool where users can stake their Namo tokens and harvest more MMT. Introduce of a unique USDT rewarding pool where users can stake their MMT and harvest USDT. Note: The reward of this pool will be provided by CoinAI Trading Protocol.",
      contentThree:
        "Farms: Launch of Namo Token's farming platform, allowing users to stake their tokens and earn rewards. Introduce of initial farming pools with attractive APYs to incentivize participation. Conduct thorough audits and security checks to ensure the safety of users' funds.",
    },
    {
      name: "q2",
      precious: "Q4, 2025",
      quarter: 4,
      year: 2023,
      endTime: "2023-12-31",
      contentOne:
        "Expanding Farming Horizons: Expanding the selection of farming pools, if necessary introducing new pairs and innovative staking options.",
      contentTwo:
        "Engaging in strategic partnerships to bring exclusive farming opportunities to the Namo Token community.",
      contentThree:
        "NFT: Launch of the Namo Token special edition NFTs and based on the team’s decision possibly an NFT Marketplace, providing a platform for creators to mint and sell unique digital NFTs and assets.",
      contentFourth:
        "Collaboration with talented artists to curate a diverse collection of Namo-themed NFTs. Implementing a user-friendly interface for seamless buying, selling, and trading of NFTs.",
      contentFifth:
        "Artistic Expressions: Organizing NFT drops and collaborations with prominent artists, celebrities, and brands to expand the range of collectibles.",
      contentSixth:
        "Engaging and collaborating with OpenSea for the marketplace functionality with advanced search and discovery features, enabling users to find their desired NFTs and to make seamless NFT transactions.",
      contentSeventh:
        "Introducing Passive Income elements to the Namo NFTs, offering interactive experiences and rewards tied to the Namo special NFTs.",
    },
    {
      name: "q3",
      precious: "Q1, 2024",
      quarter: 1,
      year: 2024,
      endTime: "2024-03-31",
      contentOne:
        "Advance Artificial Intelligence Powered Trade Protocols (CoinAI): Collaborating with CoinAI.app and introducing the CoinAI Pools, empowering users to earn USDT by staking USDT in a high yield pool.",
      contentTwo:
        "Collaboration with AI experts, blockchain developers and data scientists not only to develop and improve trading and arbitrage protocols but also to build captivating and informative AI visualizations for crypto industry.",
      contentThree:
        "Providing educational resources and tutorials to help users understand the practical applications of AI in various fields of crypto technology.",
    },
    {
      name: "q4",
      precious: "Q2, 2025",
      quarter: 2,
      year: 2024,
      endTime: "2024-06-30",
      contentOne:
        "DeFi Innovations: Further expansion of the range of farming pools, incorporating new tokens and innovative staking mechanisms.",
      contentTwo:
        "Implementing cross-chain compatibility, allowing users to farm and stake their Namo Tokens on multiple blockchain networks. Introduction of AI yield optimization strategies and automated farming tools, such as bots and apps to enhance user returns.",
      contentThree:
        "Governance Platform: In our continual quest to create a more interactive and user-driven network, our next major step will be launching the Governance Platform. This will be a comprehensive, blockchain-based system that allows for transparent decision-making across our network. Stakeholders will be able to participate directly in the decision-making process, helping to shape the future of our organization. Through this platform, each voice will be heard, and every idea will be valued, fostering a true sense of collective ownership and accountability. By integrating state-of-the-art voting and discussion features, our Governance Platform will empower our community like never before to drive innovation, co-create, and directionally steer the path forward.",
    },
  ];

  const currentDate = dayjs();
  const currentQuarter = Math.floor((currentDate.month() + 3) / 3);
  const currentYear = currentDate.year();

  const firstDayOfNextQuarter = dayjs()
    .year(currentYear)
    .month(currentQuarter * 3 - 1)
    .startOf("month");

  const lastDayOfCurrentQuarter = firstDayOfNextQuarter
    .add(1, "month")
    .subtract(1, "day");
  const lastQuarter = lastDayOfCurrentQuarter.format("YYYY-MM-DD");

  return (
    <div
      id="roadmap"
      className="max-w-6xl w-full pt-28 mx-auto px-4 lg:px-6 2xl:px-0"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between mb-10">
        <div className="w-full lg:w-5/12">
          <span className="text-blue-500 text-sm uppercase tracking-widest font-normal mb-2 block">
            [ROADMAP]
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-6">
            Innovation Unleashed. Future Driven.
          </h2>
          <p className="text-gray-200 text-base leading-relaxed">
            Embark on an exciting roadmap with Namo Token: Innovations and
            milestones shaping our future.
          </p>
        </div>
        <div className="w-full lg:w-5/12 mt-6 lg:mt-0 flex justify-start lg:justify-end">
          <img
            src="./assets/ImageRoadmap.svg"
            alt="Roadmap"
            className="w-[475px] h-[316px] object-contain"
            // onError={(e) => (e.target.src = "https://via.placeholder.com/475x316")}
          />
        </div>
      </div>

      {/* Roadmap Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 text-gray-50">
        {roadmap.map((item, index) => {
          const isActiveQuarter = item.quarter === currentQuarter;
          const isActiveYear = item.year === currentYear;
          const isActive =
            (currentQuarter > item.quarter && isActiveYear) ||
            currentYear > item.year ||
            (isActiveQuarter && isActiveYear);

          return (
            <div
              key={index}
              className="w-full min-w-[25%] border border-gray-600 rounded-lg p-[1px] bg-gradient-to-br from-gray-800 to-transparent"
            >
              <div className="bg-gray-900 w-full rounded-lg p-6">
                <h3
                  className="text-xl font-semibold mb-8"
                  style={{
                    color: isActiveQuarter && isActiveYear ? "#1ED760" : "#C4D3D9",
                  }}
                >
                  {item.precious}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <img
                      src={
                        isActive
                          ? "./assets/roadmap-icon-active.svg"
                          : "./assets/roadmap-icon.svg"
                      }
                      alt="icon"
                      className="w-5 h-5 mr-4"
                    //   onError={(e) =>
                    //     (e.target.src = "https://via.placeholder.com/20")
                    //   }
                    />
                    <p className="text-gray-300 text-base">{item.contentOne}</p>
                  </div>
                  {item.contentTwo && (
                    <div className="flex items-start">
                      <img
                        src={
                          isActive && lastQuarter > item.endTime
                            ? "./assets/roadmap-icon-active.svg"
                            : "./assets/roadmap-icon.svg"
                        }
                        alt="icon"
                        className="w-5 h-5 mr-4"
                      />
                      <p className="text-gray-300 text-base">{item.contentTwo}</p>
                    </div>
                  )}
                  {item.contentThree && (
                    <div className="flex items-start">
                      <img
                        src={
                          isActive && lastQuarter > item.endTime
                            ? "./assets/roadmap-icon-active.svg"
                            : "./assets/roadmap-icon.svg"
                        }
                        alt="icon"
                        className="w-5 h-5 mr-4"
                      />
                      <p className="text-gray-300 text-base">{item.contentThree}</p>
                    </div>
                  )}
                  {item.contentFourth && (
                    <div className="flex items-start">
                      <img
                        src={
                          isActive && lastQuarter > item.endTime
                            ? "./assets/roadmap-icon-active.svg"
                            : "./assets/roadmap-icon.svg"
                        }
                        alt="icon"
                        className="w-5 h-5 mr-4"
                      />
                      <p className="text-gray-300 text-base">{item.contentFourth}</p>
                    </div>
                  )}
                  {item.contentFifth && (
                    <div className="flex items-start">
                      <img
                        src={
                          isActive && lastQuarter > item.endTime
                            ? "./assets/roadmap-icon-active.svg"
                            : "./assets/roadmap-icon.svg"
                        }
                        alt="icon"
                        className="w-5 h-5 mr-4"
                      />
                      <p className="text-gray-300 text-base">{item.contentFifth}</p>
                    </div>
                  )}
                  {item.contentSixth && (
                    <div className="flex items-start">
                      <img
                        src={
                          isActive && lastQuarter > item.endTime
                            ? "./assets/roadmap-icon-active.svg"
                            : "./assets/roadmap-icon.svg"
                        }
                        alt="icon"
                        className="w-5 h-5 mr-4"
                      />
                      <p className="text-gray-300 text-base">{item.contentSixth}</p>
                    </div>
                  )}
                  {item.contentSeventh && (
                    <div className="flex items-start">
                      <img
                        src={
                          isActive && lastQuarter > item.endTime
                            ? "./assets/roadmap-icon-active.svg"
                            : "./assets/roadmap-icon.svg"
                        }
                        alt="icon"
                        className="w-5 h-5 mr-4"
                      />
                      <p className="text-gray-300 text-base">{item.contentSeventh}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
